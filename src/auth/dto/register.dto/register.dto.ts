import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role, PatientType, ProviderType } from '../../enums/roles.enum.js';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role, {
    message: 'role must be a valid numeric user category (0 through 10)',
  })
  role: Role;

  @IsOptional()
  @IsEnum(PatientType, {
    message: 'patientType must be valid (0: ELDERLY, 1: DISABILITY)',
  })
  patientType?: PatientType | null;

  @IsOptional()
  @IsEnum(ProviderType, {
    message: 'providerType must be valid (2: DOCTOR, 3: PHARMACY, 4: PHYSIOTHERAPIST, 5: NURSE)',
  })
  providerType?: ProviderType | null;
}
