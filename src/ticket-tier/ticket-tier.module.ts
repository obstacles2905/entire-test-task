import { Module } from '@nestjs/common';
import { TicketTierService } from './ticket-tier.service';
import { TicketTierController } from './ticket-tier.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TicketTierRepository } from './ticket-tier.repository';

@Module({
  imports: [PrismaModule],
  providers: [TicketTierService, TicketTierRepository],
  controllers: [TicketTierController],
})
export class TicketTierModule {}
