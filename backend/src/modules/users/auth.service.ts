import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtTokenService: JwtService,
  ) {}

  async signUpUser(userDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersService.getByEmail(userDto.email);

    if (existingUser) {
      throw new BadRequestException('user exists');
    }

    const salt = randomBytes(8).toString('hex');
    userDto.password = await this.getHashedPassword(salt, userDto.password);

    return this.usersService.save(userDto);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const existingUser = await this.usersService.getByEmail(email);

    if (!existingUser) {
      throw new NotFoundException('user does not exist');
    }

    const [salt, storedHash] = existingUser.password.split('.');

    const [, hash] = (await this.getHashedPassword(salt, password)).split('.');

    if (storedHash !== hash) {
      throw new BadRequestException('bad password');
    }

    return existingUser;
  }

  async signInUser(user: User): Promise<string> {
    const payload = {
      email: user.email,
      name: user.name,
      id: user.id,
    };

    return this.jwtTokenService.sign(payload);
  }

  private async getHashedPassword(
    salt: string,
    password: string,
  ): Promise<string> {
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    return salt + '.' + hash.toString('hex');
  }
}
