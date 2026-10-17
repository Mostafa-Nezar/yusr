import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Appointment,
  AppointmentDocument,
} from './schemas/appointment.schema/appointment.schema.js';
import { BookAppointmentDto } from './dto/book-appointment.dto/book-appointment.dto.js';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto/update-appointment-status.dto.js';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
  ) {}

  async book(patientId: string, dto: BookAppointmentDto) {
    return this.appointmentModel.create({
      providerId: dto.providerId,
      appointmentDate: new Date(dto.appointmentDate),
      notes: dto.notes ?? '',
      patientId,
      status: 'Pending',
    });
  }

  async getMyAppointments(patientId: string) {
    return this.appointmentModel
      .find({ patientId })
      .sort({ appointmentDate: 1 })
      .exec();
  }

  async updateStatus(
    id: string,
    dto: UpdateAppointmentStatusDto,
  ) {
    const appointment = await this.appointmentModel.findByIdAndUpdate(
      id,
      { status: dto.status },
      { new: true, runValidators: true },
    );

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }
}
