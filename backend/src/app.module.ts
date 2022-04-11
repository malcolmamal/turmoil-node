import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { MessageBusModule } from './providers/message-bus/message-bus.module';
import { SendMailModule } from './providers/send-mail/send-mail.module';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [
    UsersModule,
    MessageBusModule,
    SendMailModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'nopass',
      database: 'turmoil',
      entities: [User],
      synchronize: true,
    }),
    CharacterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
