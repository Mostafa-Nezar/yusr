import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PharmacyController } from './pharmacy.controller.js';
import { PharmacyService } from './pharmacy.service.js';
import { Prescription, PrescriptionSchema } from './schemas/prescription.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Prescription.name, schema: PrescriptionSchema }])],
  controllers: [PharmacyController],
  providers: [PharmacyService],
})
export class PharmacyModule {}
