import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/users.entity';
import { MessageBusModule } from './providers/message-bus/message-bus.module';
import { SendMailModule } from './providers/send-mail/send-mail.module';
import { CharacterModule } from './modules/character/character.module';
import { InstanceModule } from './modules/instance/instance.module';
import { TooltipModule } from './modules/tooltip/tooltip.module';
import { databaseConstants } from './config/constants';

@Module({
  imports: [
    TooltipModule,
    InstanceModule,
    UsersModule,
    MessageBusModule,
    SendMailModule,
    TypeOrmModule.forRoot({
      ...databaseConstants,
      synchronize: true,
      entities: [User],
    }),
    CharacterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
