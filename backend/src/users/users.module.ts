import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { MessageBus } from 'src/providers/message-bus/message-bus';
import { MessageBusModule } from 'src/providers/message-bus/message-bus.module';
import { AuthService } from './auth.service';
import { jwtConstants } from 'src/config/constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MessageBusModule,
    MessageBus,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy],
})
export class UsersModule {}
