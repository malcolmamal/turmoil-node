import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dtos/create-user-dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async save(userDto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(userDto);
    return this.userRepo.save(user);
  }

  async get(id: number): Promise<User> {
    return this.userRepo.findOne({ id });
  }
}
