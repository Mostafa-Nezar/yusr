import { Controller, Get, Param, Post, Res, ServiceUnavailableException } from '@nestjs/common';
import type { Response } from 'express';

import { PharmacyService } from './pharmacy.service';

@Controller('api/Pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Post('upload-prescription')
  uploadPrescription() {
    throw new ServiceUnavailableException(
      'Prescription image uploads are temporarily disabled',
    );
  }

  @Get('image/:orderId')
  async getImage(
    @Param('orderId') orderId: string,
    @Res() res: Response,
  ) {
    const imagePath = await this.pharmacyService.getImage(orderId);
    return res.sendFile(imagePath);
  }

  @Get('my-orders')
  getMyOrders() {
    return this.pharmacyService.getMyOrders('TEMP_PATIENT_ID');
  }
}
