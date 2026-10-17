import { PartialType } from '@nestjs/mapped-types';
import { CreatePharmacyDto } from './create-pharmacy.dto.js';

export class UpdatePharmacyDto extends PartialType(CreatePharmacyDto) {}
