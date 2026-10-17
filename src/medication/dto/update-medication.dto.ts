import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicationDto } from './create-medication.dto.js';

export class UpdateMedicationDto extends PartialType(CreateMedicationDto) {}
