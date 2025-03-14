import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import {
  CreateTicketTierDTO,
  TicketTierDTO,
  UpdateTicketTierDTO,
} from './ticket-tier.contracts';

@Injectable()
export class TicketTierRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves all TicketTier records from the database.
   * @returns A promise that resolves to an array of TicketTier records.
   */
  async findAll(): Promise<TicketTierDTO[]> {
    return plainToInstance(
      TicketTierDTO,
      await this.prisma.ticketTier.findMany(),
    );
  }

  /**
   * Retrieves a TicketTier record by its ID.
   * @param id - The ID of the TicketTier.
   * @returns A promise that resolves to the TicketTier record or null if not found.
   */
  async findById(id: number): Promise<TicketTierDTO | null> {
    return plainToInstance(
      TicketTierDTO,
      await this.prisma.ticketTier.findUnique({
        where: { id },
      }),
    );
  }

  /**
   * Creates a new TicketTier record in the database.
   * @param data - An object containing buyerPrice, serviceFee and promoterReceivesPrice.
   * @returns A promise that resolves to the created TicketTier record.
   */
  async create(data: CreateTicketTierDTO): Promise<TicketTierDTO> {
    return plainToInstance(
      TicketTierDTO,
      await this.prisma.ticketTier.create({ data }),
    );
  }

  /**
   * Updates an existing TicketTier record in the database.
   * @param id - The ID of the TicketTier to update.
   * @param data - An object containing updated buyerPrice, serviceFee and promoterReceivesPrice.
   * @returns A promise that resolves to the updated TicketTier record.
   */
  async update(id: number, data: UpdateTicketTierDTO): Promise<TicketTierDTO> {
    return plainToInstance(
      TicketTierDTO,
      await this.prisma.ticketTier.update({ where: { id }, data }),
    );
  }
}
