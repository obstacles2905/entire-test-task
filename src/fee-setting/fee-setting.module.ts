import { Module } from '@nestjs/common';
import { FeeSettingService } from './fee-setting.service';
import { FeeSettingController } from './fee-setting.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FeeSettingRepository } from './fee-setting.repository';

@Module({
  imports: [PrismaModule],
  controllers: [FeeSettingController],
  providers: [FeeSettingService, FeeSettingRepository],
  exports: [FeeSettingService],
})
export class FeeSettingModule {}
