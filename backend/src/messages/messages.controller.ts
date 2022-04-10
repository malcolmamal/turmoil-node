import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages(): string {
    return 'message';
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto): any {
    console.log(body);
    return `hell yeah ${JSON.stringify(body)}`;
  }

  @Get('/:id')
  getMessage(@Param('id') id: string): string {
    return `aaa ${id}`;
  }
}
