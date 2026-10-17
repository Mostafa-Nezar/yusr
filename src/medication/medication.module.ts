import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MedicationController } from './medication.controller.js';
import { MedicationService } from './medication.service.js';
import {
  Medication,
  MedicationSchema,
} from './schemas/medication.schema/medication.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Medication.name, schema: MedicationSchema },
    ]),
  ],
  controllers: [MedicationController],
  providers: [MedicationService],
})
export class MedicationModule {}
