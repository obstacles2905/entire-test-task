import { Body, Controller, Post } from '@nestjs/common';
import { PriceCalculationService } from './price-calculation.service';
import {
  PriceCalculationDTO,
  PriceCalculationResultDTO,
} from './price-calculation.contracts';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('price-calculation')
@Controller('price-calculation')
export class PriceCalculationController {
  constructor(private priceCalculationService: PriceCalculationService) {}

  /**
   * Endpoint for calculating the price. Doesn't support saving result in DB.
   * Accepts either buyerPrice or promoterReceivesPrice.
   */
  @Post('calculate')
  @ApiOperation({ summary: 'Calculate ticket price' })
  @ApiResponse({
    status: 200,
    description: 'Calculated price details',
    type: PriceCalculationResultDTO,
  })
  async calculate(
    @Body() body: PriceCalculationDTO,
  ): Promise<PriceCalculationResultDTO> {
    return this.priceCalculationService.calculate(body);
  }
}
