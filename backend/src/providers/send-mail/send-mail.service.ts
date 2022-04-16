import { Injectable } from '@nestjs/common';
import { MessageBus } from '../message-bus/message-bus';

@Injectable()
export class SendMailService {
  constructor(private messageBus: MessageBus) {}

  async consume() {
    await this.messageBus.consume();
    console.log('[MessageBus] Created sendmail consumer.');
  }
}
