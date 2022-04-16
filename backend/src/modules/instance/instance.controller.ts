import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../users/jwt-auth.guard';
import { InstanceService } from './instance.service';

@Controller('instance')
export class InstanceController {
  constructor(private instanceService: InstanceService) {}

  @UseGuards(JwtAuthGuard)
  @Get('initializeStash')
  async initializeStash() {
    return this.instanceService.initializeStash();
  }

  @UseGuards(JwtAuthGuard)
  @Get('initializeEquipment')
  async initializeEquipment() {
    return this.instanceService.initializeEquipment();
  }

  @UseGuards(JwtAuthGuard)
  @Get('initializeEnemyUnits')
  async initializeEnemyUnits() {
    return this.instanceService.initializeEnemyUnits();
  }

  @UseGuards(JwtAuthGuard)
  @Get('initializeFriendlyUnits')
  async initializeFriendlyUnits() {
    return this.instanceService.initializeFriendlyUnits();
  }

  @UseGuards(JwtAuthGuard)
  @Get('instanceActionOnPosition/:position')
  async instanceActionOnPosition(@Param('position') position: string) {
    return this.instanceService.instanceActionOnPosition(position);
  }
}
