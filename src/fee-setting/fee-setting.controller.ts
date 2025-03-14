import { Controller, Get, Patch, Body } from '@nestjs/common';
import { FeeSettingService } from './fee-setting.service';
import { FeeSettingDTO, UpdateFeeSettingDTO } from './fee-setting.contracts';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('fee-setting')
@Controller('fee-setting')
export class FeeSettingController {
  constructor(private feeSettingService: FeeSettingService) {}

  @Get()
  @ApiOperation({ summary: 'Get current fee setting' })
  @ApiResponse({
    status: 200,
    description: 'Current fee setting',
    type: FeeSettingDTO,
  })
  async getSetting(): Promise<FeeSettingDTO> {
    return this.feeSettingService.getFeeSetting();
  }

  @Patch()
  @ApiOperation({ summary: 'Update fee setting' })
  @ApiResponse({
    status: 200,
    description: 'Fee setting updated',
    type: FeeSettingDTO,
  })
  async updateSetting(
    @Body() body: UpdateFeeSettingDTO,
  ): Promise<FeeSettingDTO> {
    return this.feeSettingService.upsertFeeSetting(body);
  }
}
