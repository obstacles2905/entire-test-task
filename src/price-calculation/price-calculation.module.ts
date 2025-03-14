import { Module } from '@nestjs/common';
import { PriceCalculationService } from './price-calculation.service';
import { PriceCalculationController } from './price-calculation.controller';
import { FeeSettingModule } from '../fee-setting/fee-setting.module';

@Module({
  imports: [FeeSettingModule],
  providers: [PriceCalculationService],
  controllers: [PriceCalculationController],
})
export class PriceCalculationModule {}
