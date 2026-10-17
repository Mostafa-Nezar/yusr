import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role, PatientType, ProviderType } from '../../enums/roles.enum';

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
    message: 'role must be a valid role (1: PATIENT, 2: PROVIDER, 3: ADMIN)',
  })
  role: Role;

  @IsOptional()
  @IsEnum(PatientType, {
    message: 'patientType must be valid (1: NORMAL, 2: CHRONIC, 3: ELDERLY)',
  })
  patientType?: PatientType | null;

  @IsOptional()
  @IsEnum(ProviderType, {
    message: 'providerType must be valid (1: DOCTOR, 2: NURSE, 3: PHYSIOTHERAPIST)',
  })
  providerType?: ProviderType | null;
}
