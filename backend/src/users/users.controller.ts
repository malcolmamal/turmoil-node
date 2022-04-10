import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
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

  @Post('update')
  async updateUser(@Body() body: UpdateUserDto): Promise<User> {
    console.log(body);
    return this.userService.update(body);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string): Promise<User> {
    return this.userService.get(parseInt(id, 10));
  }
}
