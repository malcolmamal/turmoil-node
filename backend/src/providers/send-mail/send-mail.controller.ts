import { Controller } from '@nestjs/common';
import { MessageBus } from '../message-bus/message-bus';

@Controller('send-mail')
export class SendMailController {
  constructor(private messageBus: MessageBus) {}

  async onModuleInit(): Promise<void> {
    // should be in service
    await this.messageBus.consume();
    console.log('created sendmail consumer');
  }
}
