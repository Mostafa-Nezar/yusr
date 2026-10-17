import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class BookAppointmentDto {
  @IsInt()
  @Min(1)
  providerId!: number;

  @IsDateString()
  appointmentDate!: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  patientId?: string;
}
