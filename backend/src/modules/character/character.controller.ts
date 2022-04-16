import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/users/jwt-auth.guard';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @UseGuards(JwtAuthGuard)
  @Get('state')
  async getState() {
    return this.characterService.getState();
  }

  @UseGuards(JwtAuthGuard)
  @Get('equip/:item')
  async equip(@Param('item') item: string) {
    return this.characterService.equip(item);
  }

  @UseGuards(JwtAuthGuard)
  @Get('unequip/:item')
  async unequip(@Param('item') item: string) {
    return this.characterService.unequip(item);
  }
}
