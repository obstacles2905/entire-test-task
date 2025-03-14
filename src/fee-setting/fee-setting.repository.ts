import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { FeeSettingDTO, UpdateFeeSettingDTO } from './fee-setting.contracts';

@Injectable()
export class FeeSettingRepository {
  private defaultFeeId = 1;
  constructor(private prisma: PrismaService) {}

  async getFeeSettings(): Promise<FeeSettingDTO | null> {
    return this.prisma.feeSetting.findUnique({
      where: { id: this.defaultFeeId },
    });
  }

  async upsertFeeSetting(data: UpdateFeeSettingDTO): Promise<FeeSettingDTO> {
    const feeSetting = this.prisma.feeSetting.upsert({
      where: { id: this.defaultFeeId },
      update: data,
      create: { id: this.defaultFeeId, ...data },
    });

    return plainToInstance(FeeSettingDTO, feeSetting);
  }
}
