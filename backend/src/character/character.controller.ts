import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @UseGuards(JwtAuthGuard)
  @Get('state')
  async state() {
    return this.characterService.getState();
  }
}
