import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PharmacyController } from './pharmacy.controller';
import { PharmacyService } from './pharmacy.service';
import { Prescription, PrescriptionSchema } from './schemas/prescription.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Prescription.name, schema: PrescriptionSchema }])],
  controllers: [PharmacyController],
  providers: [PharmacyService],
})
export class PharmacyModule {}
