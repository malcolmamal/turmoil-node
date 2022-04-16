import { Controller } from '@nestjs/common';
import { SendMailService } from './send-mail.service';

@Controller('send-mail')
export class SendMailController {
  constructor(private sendMailService: SendMailService) {}

  async onModuleInit(): Promise<void> {
    // should be in service
    await this.sendMailService.consume();
  }
}
