import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TooltipController } from './tooltip.controller';
import { TooltipService } from './tooltip.service';

@Module({
  imports: [HttpModule],
  controllers: [TooltipController],
  providers: [TooltipService],
})
export class TooltipModule {}
