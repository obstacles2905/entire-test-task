import { PriceCalculationService } from './price-calculation.service';
import {
  PriceCalculationDTO,
  PriceCalculationResultDTO,
} from './price-calculation.contracts';

const SERVICE_FEE_RATE = 1; //10%
const MINIMUM_FEE = 3;

describe('PriceCalculationService', () => {
  let service: PriceCalculationService;
  const feeSettingServiceMock = {
    getFeeSetting: jest.fn(),
  };

  beforeEach(() => {
    feeSettingServiceMock.getFeeSetting.mockResolvedValue({
      id: 1,
      serviceFeeRate: SERVICE_FEE_RATE,
      minimumFee: MINIMUM_FEE,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    service = new PriceCalculationService(feeSettingServiceMock as any);
  });

  it('should calculate correct values when buyerPrice * feeRate is greater than minimumFee', async () => {
    const buyerPrice = 70;

    const input: PriceCalculationDTO = { buyerPrice };
    const result: PriceCalculationResultDTO = await service.calculate(input);

    const expectedComputedFee = buyerPrice * (SERVICE_FEE_RATE / 10);
    const expectedPromoterReceivesPrice = buyerPrice - expectedComputedFee;

    expect(result.buyerPrice).toEqual(buyerPrice);
    expect(result.serviceFee).toEqual(expectedComputedFee);
    expect(result.promoterReceivesPrice).toEqual(expectedPromoterReceivesPrice);
  });

  it('should calculate correct values when buyerPrice * feeRate is less than minimumFee', async () => {
    const buyerPrice = 20;

    const input: PriceCalculationDTO = { buyerPrice: 20 };
    const result: PriceCalculationResultDTO = await service.calculate(input);

    const expectedPromoterReceivesPrice = buyerPrice - MINIMUM_FEE;

    expect(result.buyerPrice).toEqual(buyerPrice);
    expect(result.serviceFee).toEqual(MINIMUM_FEE);
    expect(result.promoterReceivesPrice).toEqual(expectedPromoterReceivesPrice);
  });

  it('should calculate correct values using standard model when promoterReceivesPrice is above threshold', async () => {
    // For feeRate=0.1 and minimumFee=3, threshold = (3*(1 - 0.1))/0.1 = (3*0.9)/0.1 = 27.
    // buyerPrice = 30 / 0.9 ≈ 33.33, serviceFee = 33.33 * 0.1 ≈ 3.33.
    const input: PriceCalculationDTO = { promoterReceivesPrice: 30 };
    const result: PriceCalculationResultDTO = await service.calculate(input);

    expect(result.buyerPrice).toBeCloseTo(33.33, 1);
    expect(result.serviceFee).toBeCloseTo(3.33, 1);
    expect(result.promoterReceivesPrice).toBeCloseTo(30);
  });

  it('should calculate correct values using fixed commission model when promoterReceivesPrice is below threshold', async () => {
    // buyerPrice = promoterReceivesPrice + minimumFee = 20 + 3 = 23, serviceFee = minimumFee = 3.
    const input: PriceCalculationDTO = { promoterReceivesPrice: 20 };
    const result: PriceCalculationResultDTO = await service.calculate(input);

    expect(result.buyerPrice).toEqual(23);
    expect(result.serviceFee).toEqual(MINIMUM_FEE);
    expect(result.promoterReceivesPrice).toEqual(20);
  });

  it('should throw error when neither buyerPrice nor promoterReceivesPrice is provided', async () => {
    await expect(service.calculate({})).rejects.toThrowError(
      'Must provide either buyerPrice or promoterReceivesPrice',
    );
  });
});
