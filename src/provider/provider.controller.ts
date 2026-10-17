import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  Query,
} from '@nestjs/common';

import { ProviderService } from './provider.service';
import { UpdateProviderProfileDto } from './dto/update-provider-profile.dto/update-provider-profile.dto';

@Controller('api/Provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Put('update-profile')
  updateProfile(
    @Body() dto: UpdateProviderProfileDto,
    @Query('userId') queryUserId?: string,
  ) {
    const userId = queryUserId || dto.userId;
    if (!userId) {
      throw new BadRequestException('userId is required');
    }
    return this.providerService.updateProfile(userId, dto);
  }

  @Get('my-profile')
  getMyProfile(@Query('userId') userId: string) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }
    return this.providerService.getMyProfile(userId);
  }

  @Get('all-providers')
  getAllProviders(@Query('specialty') specialty?: string) {
    return this.providerService.getAllProviders(specialty);
  }
}
