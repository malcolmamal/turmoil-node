import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export const API_PATH = 'http://localhost:8080';

@Injectable()
export class CharacterService {
  constructor(private httpService: HttpService) {}

  async getState() {
    const response = await lastValueFrom(
      this.httpService.get(`${API_PATH}/character/state`),
    );

    return response.data;
  }
}
