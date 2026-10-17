import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PatientController } from './patient.controller.js';
import { PatientService } from './patient.service.js';
import { Patient, PatientSchema } from './schemas/patient.schema/patient.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Patient.name, schema: PatientSchema },
    ]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
