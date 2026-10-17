import { Body, Controller, Get, Put } from '@nestjs/common';
import { PatientService } from './patient.service.js';
import { UpdatePatientProfileDto } from './dto/update-patient-profile.dto/update-patient-profile.dto.js';

@Controller(['Patient', 'api/Patient'])
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('my-profile')
  getMyProfile() {
    return this.patientService.getMyProfile('TEMP_PATIENT_ID');
  }

  @Put('update-profile')
  updateProfile(@Body() dto: UpdatePatientProfileDto) {
    return this.patientService.updateProfile('TEMP_PATIENT_ID', dto);
  }
}
