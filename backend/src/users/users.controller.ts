import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('show')
  getUsers() {
    return 'adobajos!';
  }

  @Post('create')
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    console.log(body);
    return this.userService.save(body);
  }
}
