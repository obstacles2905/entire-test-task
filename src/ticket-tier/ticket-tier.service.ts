import { Injectable, NotFoundException } from '@nestjs/common';
import { TicketTierRepository } from './ticket-tier.repository';
import {
  CreateTicketTierDTO,
  TicketTierDTO,
  UpdateTicketTierDTO,
} from './ticket-tier.contracts';

@Injectable()
export class TicketTierService {
  constructor(private ticketTierRepository: TicketTierRepository) {}

  /**
   * Retrieves all TicketTier records.
   * @returns A promise that resolves to an array of PriceCalculationResultDTO.
   */
  async getAllTicketTiers(): Promise<TicketTierDTO[]> {
    return await this.ticketTierRepository.findAll();
  }

  /**
   * Retrieves a TicketTier record by its ID.
   * @param id - The ID of the TicketTier.
   * @returns A promise that resolves to the TicketTier as PriceCalculationResultDTO.
   * @throws NotFoundException if the TicketTier is not found.
   */
  async getTicketTier(id: number): Promise<TicketTierDTO> {
    const tier = await this.ticketTierRepository.findById(id);
    if (!tier) {
      throw new NotFoundException(`TicketTier with id ${id} not found`);
    }
    return tier;
  }

  /**
   * Creates a new TicketTier record by directly saving the provided data.
   * No price calculations are performed in this method.
   * @param input - CreateTicketTierDTO containing buyerPrice, serviceFee, and promoterReceivesPrice.
   * @returns A promise that resolves to the created TicketTier wrapped as TicketTierDTO.
   */
  async createTicketTier(input: CreateTicketTierDTO): Promise<TicketTierDTO> {
    return await this.ticketTierRepository.create(input);
  }

  /**
   * Updates an existing TicketTier record by directly saving the provided data.
   * No price recalculations are performed in this method.
   * @param id - The ID of the TicketTier to update.
   * @param input - PriceCalculationDTO containing updated buyerPrice, serviceFee, and promoterReceivesPrice.
   * @returns A promise that resolves to the updated TicketTier as PriceCalculationResultDTO.
   * @throws NotFoundException if the TicketTier is not found.
   */
  async updateTicketTier(
    id: number,
    input: UpdateTicketTierDTO,
  ): Promise<TicketTierDTO> {
    const existing = await this.ticketTierRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`TicketTier with id ${id} not found`);
    }
    return await this.ticketTierRepository.update(id, input);
  }
}
