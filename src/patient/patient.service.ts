import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Patient, PatientDocument } from './schemas/patient.schema/patient.schema';
import { UpdatePatientProfileDto } from './dto/update-patient-profile.dto/update-patient-profile.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
  ) {}

  async getMyProfile(userId: string) {
    const patient = await this.patientModel.findOne({ userId }).exec();

    if (!patient) {
      throw new NotFoundException('Patient profile not found');
    }

    return patient;
  }

  async updateProfile(
    userId: string,
    dto: UpdatePatientProfileDto,
  ) {
    return this.patientModel.findOneAndUpdate(
      { userId },
      { $set: dto },
      { new: true, upsert: true, runValidators: true },
    );
  }
}
