import { Module } from '@nestjs/common';
import { MessageBus } from './message-bus';

@Module({
  providers: [
    {
      provide: MessageBus,
      useClass: MessageBus,
    },
  ],
  exports: [
    {
      provide: MessageBus,
      useClass: MessageBus,
    },
  ],
})
export class MessageBusModule {}
