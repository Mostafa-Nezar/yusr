import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class MedicationRequestDto {
  @IsString()
  @IsNotEmpty()
  medName!: string;

  @IsString()
  @IsNotEmpty()
  dosage!: string;

  @IsDateString()
  reminderTime!: string;

  @IsOptional()
  @IsString()
  patientId?: string;
}
