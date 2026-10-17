import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppointmentService } from './appointment.service.js';
import { AppointmentController } from './appointment.controller.js';
import {
  Appointment,
  AppointmentSchema,
} from './schemas/appointment.schema/appointment.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
