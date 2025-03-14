import { BadRequestException, Injectable } from '@nestjs/common';
import {
  PriceCalculationDTO,
  PriceCalculationResultDTO,
} from './price-calculation.contracts';
import { FeeSettingService } from '../fee-setting/fee-setting.service';

/**
 * Service for calculating ticket price fields.
 * The feeRate and minimumFee are fetched from the database via FeeSettingService.
 *
 * Note: The feeRate stored in the database is in the format where
 * 1 = 10%, 2 = 20%, etc. Thus, we convert it to a decimal by multiplying by 0.1.
 */
@Injectable()
export class PriceCalculationService {
  constructor(private readonly feeSettingService: FeeSettingService) {}

  /**
   * Calculates the price fields based on the provided input.
   * The fee settings are retrieved from the database before calculation.
   *
   * @param input - The input data containing either buyerPrice or promoterReceivesPrice.
   * @returns A promise that resolves to the calculated price fields.
   * @throws Error if neither buyerPrice nor promoterReceivesPrice is provided.
   */
  async calculate(
    input: PriceCalculationDTO,
  ): Promise<PriceCalculationResultDTO> {
    const feeSetting = await this.feeSettingService.getFeeSetting();
    const feeRatePercents = feeSetting.serviceFeeRate * 0.1;
    const minimumFee = feeSetting.minimumFee;

    if (input.buyerPrice !== undefined) {
      return this.calculateFromBuyerPrice(
        input.buyerPrice,
        feeRatePercents,
        minimumFee,
      );
    } else if (input.promoterReceivesPrice !== undefined) {
      return this.calculateFromPromoterReceives(
        input.promoterReceivesPrice,
        feeRatePercents,
        minimumFee,
      );
    }
    throw new BadRequestException(
      'Must provide either buyerPrice or promoterReceivesPrice',
    );
  }

  /**
   * Calculates the price fields based on the buyerPrice.
   *
   * @param buyerPrice - The price that the buyer pays.
   * @param feeRate - The effective fee rate (e.g., 0.1 for 10%).
   * @param minimumFee - The minimum fee amount.
   * @returns The calculated price fields.
   */
  private calculateFromBuyerPrice(
    buyerPrice: number,
    feeRate: number,
    minimumFee: number,
  ): PriceCalculationResultDTO {
    const computedFee = buyerPrice * feeRate;
    let serviceFee: number;
    let promoterReceives: number;

    if (computedFee < minimumFee) {
      serviceFee = minimumFee;
      promoterReceives = buyerPrice - minimumFee;
    } else {
      serviceFee = computedFee;
      promoterReceives = buyerPrice - computedFee;
    }
    return {
      buyerPrice,
      serviceFee,
      promoterReceivesPrice: promoterReceives,
    };
  }

  /**
   * Calculates the price fields based on the promoterReceivesPrice.
   *
   * @param promoterReceives - The amount that the promoter receives.
   * @param feeRate - The effective fee rate (e.g., 0.1 for 10%).
   * @param minimumFee - The minimum fee amount.
   * @returns The calculated price fields.
   */
  private calculateFromPromoterReceives(
    promoterReceives: number,
    feeRate: number,
    minimumFee: number,
  ): PriceCalculationResultDTO {
    const threshold = (minimumFee * (1 - feeRate)) / feeRate;

    if (promoterReceives >= threshold) {
      const buyerPrice = promoterReceives / (1 - feeRate);
      return {
        buyerPrice,
        serviceFee: buyerPrice * feeRate,
        promoterReceivesPrice: promoterReceives,
      };
    } else {
      return {
        buyerPrice: promoterReceives + minimumFee,
        serviceFee: minimumFee,
        promoterReceivesPrice: promoterReceives,
      };
    }
  }
}
