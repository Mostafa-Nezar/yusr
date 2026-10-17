import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MedicationService } from './medication.service.js';
import { MedicationRequestDto } from './dto/medication-request.dto/medication-request.dto.js';

@Controller('api/Medication')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService ) {}

  @Post('add')
  add(
    @Body() dto: MedicationRequestDto,
    @Query('patientId') queryPatientId?: string,
  ) {
    const patientId = queryPatientId || dto.patientId;
    if (!patientId) throw new BadRequestException('patientId is required');
    return this.medicationService.add(patientId, dto);
  }

  @Get('my-medications')
  getMyMedications(@Query('patientId') patientId: string) {
    if (!patientId) throw new BadRequestException('patientId is required');
    return this.medicationService.getMyMedications(patientId);
  }

  @Put('mark-taken/:id')
  markTaken(
    @Param('id') id: string,
    @Query('patientId') queryPatientId?: string,
    @Body('patientId') bodyPatientId?: string,
  ) {
    const patientId = queryPatientId || bodyPatientId;
    if (!patientId) throw new BadRequestException('patientId is required');
    return this.medicationService.markTaken(id, patientId);
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() dto: MedicationRequestDto,
    @Query('patientId') queryPatientId?: string,
  ) {
    const patientId = queryPatientId || dto.patientId;
    if (!patientId) throw new BadRequestException('patientId is required');
    return this.medicationService.update(id, patientId, dto);
  }

  @Delete('delete/:id')
  delete(
    @Param('id') id: string,
    @Query('patientId') queryPatientId?: string,
    @Body('patientId') bodyPatientId?: string,
  ) {
    const patientId = queryPatientId || bodyPatientId;
    if (!patientId) throw new BadRequestException('patientId is required');
    return this.medicationService.delete(id, patientId);
  }
}
