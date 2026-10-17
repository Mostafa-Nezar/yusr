import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { AppointmentService } from './appointment.service.js';
import { BookAppointmentDto } from './dto/book-appointment.dto/book-appointment.dto.js';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto/update-appointment-status.dto.js';

@Controller(['Appointment', 'api/Appointment'])
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
  ) {}

  @Post('book')
  book(
    @Body() dto: BookAppointmentDto,
    @Query('patientId') queryPatientId?: string,
  ) {
    const patientId = queryPatientId || dto.patientId;
    if (!patientId) {
      throw new BadRequestException('patientId is required');
    }
    return this.appointmentService.book(patientId, dto);
  }

  @Get('my-appointments')
  getMyAppointments(@Query('patientId') patientId: string) {
    if (!patientId) {
      throw new BadRequestException('patientId is required');
    }
    return this.appointmentService.getMyAppointments(patientId);
  }

  @Put('update-status/:id')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateAppointmentStatusDto,
  ) {
    return this.appointmentService.updateStatus(id, dto);
  }
}
