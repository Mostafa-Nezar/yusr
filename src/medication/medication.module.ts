import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MedicationController } from './medication.controller';
import { MedicationService } from './medication.service';
import {
  Medication,
  MedicationSchema,
} from './schemas/medication.schema/medication.schema';

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
