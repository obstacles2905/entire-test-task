import { Injectable, NotFoundException } from '@nestjs/common';
import { FeeSettingRepository } from './fee-setting.repository';
import { plainToInstance } from 'class-transformer';
import { FeeSettingDTO, UpdateFeeSettingDTO } from './fee-setting.contracts';

@Injectable()
export class FeeSettingService {
  constructor(private feeSettingRepository: FeeSettingRepository) {}

  async getFeeSetting(): Promise<FeeSettingDTO> {
    const feeSettingRaw = await this.feeSettingRepository.getFeeSettings();
    if (!feeSettingRaw) {
      throw new NotFoundException(
        'Fee setting not found, please create it first',
      );
    }
    return plainToInstance(FeeSettingDTO, feeSettingRaw);
  }

  async upsertFeeSetting(data: UpdateFeeSettingDTO): Promise<FeeSettingDTO> {
    return this.feeSettingRepository.upsertFeeSetting(data);
  }
}
