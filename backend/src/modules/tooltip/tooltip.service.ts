import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export const API_PATH = 'http://localhost:8080';

@Injectable()
export class TooltipService {
  constructor(private httpService: HttpService) {}

  async getTooltip(type: string, ident: string) {
    const response = await lastValueFrom(
      this.httpService.get(`${API_PATH}/tooltip/${type}/${ident}`),
    );

    return response.data;
  }
}
