import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { MessageBus } from 'src/providers/message-bus/message-bus';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(
    private userService: UsersService,
    private messageBus: MessageBus,
    private authService: AuthService,
  ) {}

  @Post('create')
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    console.log(body);

    return this.authService.signUpUser(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async loginUser(
    @Request() req,
  ): Promise<{ token: string; userId: string; userName: string }> {
    const token = await this.authService.signInUser(req.user);

    return {
      token,
      userId: req.user.id.toString(),
      userName: req.user.email,
    };
  }

  @Post('update')
  async updateUser(@Body() body: UpdateUserDto): Promise<User> {
    console.log(body);
    this.messageBus.publish(JSON.stringify(body));

    return this.userService.update(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findUser(@Param('id') id: string): Promise<User> {
    return this.userService.get(parseInt(id, 10));
  }
}

// https://progressivecoder.com/how-to-implement-nestjs-passport-authentication-using-local-strategy/
// https://progressivecoder.com/how-to-implement-nestjs-jwt-authentication-using-jwt-strategy/
