import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { TicketTierService } from './ticket-tier.service';
import { PriceCalculationResultDTO } from '../price-calculation/price-calculation.contracts';
import {
  CreateTicketTierDTO,
  UpdateTicketTierDTO,
} from './ticket-tier.contracts';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('ticket-tier')
@Controller('ticket-tier')
export class TicketTierController {
  constructor(private ticketTierService: TicketTierService) {}

  @Get()
  @ApiOperation({ summary: 'Get all ticket tiers' })
  @ApiResponse({
    status: 200,
    description: 'List of ticket tiers',
    type: [PriceCalculationResultDTO],
  })
  async getAll(): Promise<PriceCalculationResultDTO[]> {
    return this.ticketTierService.getAllTicketTiers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ticket tier by ID' })
  @ApiResponse({
    status: 200,
    description: 'Ticket tier found',
    type: PriceCalculationResultDTO,
  })
  async getOne(@Param('id') id: string): Promise<PriceCalculationResultDTO> {
    return this.ticketTierService.getTicketTier(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new ticket tier' })
  @ApiResponse({
    status: 201,
    description: 'Ticket tier created',
    type: PriceCalculationResultDTO,
  })
  async create(
    @Body() body: CreateTicketTierDTO,
  ): Promise<PriceCalculationResultDTO> {
    return this.ticketTierService.createTicketTier(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing ticket tier' })
  @ApiResponse({
    status: 200,
    description: 'Ticket tier updated',
    type: PriceCalculationResultDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTicketTierDTO,
  ): Promise<PriceCalculationResultDTO> {
    return this.ticketTierService.updateTicketTier(Number(id), body);
  }
}
