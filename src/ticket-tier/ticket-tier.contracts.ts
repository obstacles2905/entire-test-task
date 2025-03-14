import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Data Transfer Object representing a TicketTier entity.
 *
 * This DTO is used to transfer TicketTier data including pricing details.
 */
export class TicketTierDTO {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the TicketTier.',
  })
  @Expose()
  id: number;

  @ApiProperty({ example: 70, description: 'The price that the buyer pays.' })
  @Expose()
  buyerPrice: number;

  @ApiProperty({
    example: 7,
    description: 'The commission fee taken by the platform.',
  })
  @Expose()
  serviceFee: number;

  @ApiProperty({
    example: 63,
    description: 'The amount received by the promoter.',
  })
  @Expose()
  promoterReceivesPrice: number;

  @ApiProperty({
    type: Date,
    description: 'The timestamp when the TicketTier was created.',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'The timestamp when the TicketTier was last updated.',
  })
  @Expose()
  updatedAt: Date;
}

/**
 * Data Transfer Object used for creating a new TicketTier.
 *
 * This DTO contains the necessary pricing details to create a TicketTier.
 */
export class CreateTicketTierDTO {
  @ApiProperty({ example: 70, description: 'The price that the buyer pays.' })
  @IsNumber()
  buyerPrice: number;

  @ApiProperty({
    example: 7,
    description: 'The commission fee taken by the platform.',
  })
  @IsNumber()
  serviceFee: number;

  @ApiProperty({
    example: 63,
    description: 'The amount received by the promoter.',
  })
  @IsNumber()
  promoterReceivesPrice: number;
}

/**
 * Data Transfer Object used for updating an existing TicketTier.
 *
 * All properties are optional to allow partial updates of a TicketTier entity.
 */
export class UpdateTicketTierDTO {
  @ApiPropertyOptional({
    example: 70,
    description: 'The updated price that the buyer pays.',
  })
  @IsOptional()
  @IsNumber()
  buyerPrice?: number;

  @ApiPropertyOptional({
    example: 7,
    description: 'The updated commission fee taken by the platform.',
  })
  @IsOptional()
  @IsNumber()
  serviceFee?: number;

  @ApiPropertyOptional({
    example: 63,
    description: 'The updated amount received by the promoter.',
  })
  @IsOptional()
  @IsNumber()
  promoterReceivesPrice?: number;
}
