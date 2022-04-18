import { Module } from '@nestjs/common';
import { MessageBus } from '../message-bus/message-bus';
import { MessageBusModule } from '../message-bus/message-bus.module';
import { SendMailController } from './send-mail.controller';
import { SendMailService } from './send-mail.service';

@Module({
  imports: [MessageBusModule, MessageBus],
  controllers: [SendMailController],
  providers: [SendMailService],
})
export class SendMailModule {}
