import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { FeeSettingModule } from './fee-setting/fee-setting.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { TicketTierModule } from './ticket-tier/ticket-tier.module';
import { PriceCalculationModule } from './price-calculation/price-calculation.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    PrismaModule,
    FeeSettingModule,
    TicketTierModule,
    PriceCalculationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
