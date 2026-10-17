import { IsNotEmpty, IsNumber, IsString, Min, ValidateIf } from 'class-validator';

export class UpdatePatientProfileDto {
  @IsString()
  @ValidateIf((o) => o.medicalCondition !== undefined && o.medicalCondition !== '')
  medicalCondition?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  age: number;

  @IsString()
  @ValidateIf((o) => o.emergencyContact !== undefined && o.emergencyContact !== '')
  emergencyContact?: string;
}
