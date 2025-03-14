import { IsNumber, Min } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FeeSettingDTO {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the fee setting.',
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Service fee rate stored as an integer (e.g., 1 means 10%).',
  })
  @Expose()
  serviceFeeRate: number;

  @ApiProperty({ example: 3, description: 'Minimum fee amount in dollars.' })
  @Expose()
  minimumFee: number;

  @ApiProperty({
    type: Date,
    description: 'The timestamp when the fee setting was created.',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'The timestamp when the fee setting was last updated.',
  })
  @Expose()
  updatedAt: Date;
}

export class UpdateFeeSettingDTO {
  @ApiProperty({
    example: 1,
    description: 'Service fee rate stored as an integer (e.g., 1 means 10%).',
  })
  @IsNumber()
  @Min(0)
  serviceFeeRate: number;

  @ApiProperty({ example: 3, description: 'Minimum fee amount in dollars.' })
  @IsNumber()
  @Min(0)
  minimumFee: number;
}
