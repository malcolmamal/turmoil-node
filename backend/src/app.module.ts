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

@Module({
  imports: [
    TooltipModule,
    InstanceModule,
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
