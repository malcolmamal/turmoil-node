import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { InstanceController } from './instance.controller';
import { InstanceService } from './instance.service';

@Module({
  imports: [HttpModule],
  controllers: [InstanceController],
  providers: [InstanceService],
})
export class InstanceModule {}
