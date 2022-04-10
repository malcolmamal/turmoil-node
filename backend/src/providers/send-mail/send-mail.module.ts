import { Module } from '@nestjs/common';
import { MessageBus } from '../message-bus/message-bus';
import { MessageBusModule } from '../message-bus/message-bus.module';
import { SendMailController } from './send-mail.controller';

@Module({
  imports: [MessageBusModule, MessageBus],
  controllers: [SendMailController],
})
export class SendMailModule {}
