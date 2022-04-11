import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async save(userDto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(userDto);
    return this.userRepo.save(user);
  }

  async update(userDto: UpdateUserDto): Promise<User> {
    const user = (await this.userRepo.findOne({
      where: { id: userDto.id },
    })) as Partial<User>;

    if (!user) {
      throw new NotFoundException('user not found!!');
    }

    user.name = userDto.name;
    user.email = userDto.email;

    return this.userRepo.save(user);
  }

  async get(id: number): Promise<User> {
    return this.userRepo.findOne({ where: { id } });
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({
      where: { email },
    });
  }
}
