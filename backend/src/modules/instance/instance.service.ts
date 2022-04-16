import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export const API_PATH = 'http://localhost:8080';

@Injectable()
export class InstanceService {
  constructor(private httpService: HttpService) {}

  async initializeStash() {
    const response = await lastValueFrom(
      this.httpService.get(`${API_PATH}/initializeStash`),
    );

    return response.data;
  }

  async initializeEquipment() {
    const response = await lastValueFrom(
      this.httpService.get(`${API_PATH}/initializeEquipment`),
    );

    return response.data;
  }

  async initializeEnemyUnits() {
    const response = await lastValueFrom(
      this.httpService.get(`${API_PATH}/instance/initializeEnemyUnits`),
    );

    return response.data;
  }

  async initializeFriendlyUnits() {
    const response = await lastValueFrom(
      this.httpService.get(`${API_PATH}/instance/initializeFriendlyUnits`),
    );

    return response.data;
  }

  async instanceActionOnPosition(position: string) {
    const response = await lastValueFrom(
      this.httpService.get(
        `${API_PATH}/instance/instanceActionOnPosition/${position}`,
      ),
    );

    return response.data;
  }
}
