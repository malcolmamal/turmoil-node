import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../users/jwt-auth.guard';
import { TooltipService } from './tooltip.service';

@Controller('tooltip')
export class TooltipController {
  constructor(private tooltipService: TooltipService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':type/:ident')
  async getTooltip(@Param('type') type: string, @Param('ident') ident: string) {
    return this.tooltipService.getTooltip(type, ident);
  }
}
