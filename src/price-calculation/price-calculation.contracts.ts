import { IsNumber, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PriceCalculationDTO {
  @ApiPropertyOptional({
    example: 70,
    description: 'The price that the buyer pays.',
  })
  @IsOptional()
  @IsNumber()
  buyerPrice?: number;

  @ApiPropertyOptional({
    example: 63,
    description: 'The amount received by the promoter.',
  })
  @IsOptional()
  @IsNumber()
  promoterReceivesPrice?: number;
}

export class PriceCalculationResultDTO {
  @ApiProperty({ example: 70, description: 'The calculated buyer price.' })
  @Expose()
  buyerPrice: number;

  @ApiProperty({ example: 7, description: 'The calculated service fee.' })
  @Expose()
  serviceFee: number;

  @ApiProperty({
    example: 63,
    description: 'The calculated promoter receives price.',
  })
  @Expose()
  promoterReceivesPrice: number;
}
