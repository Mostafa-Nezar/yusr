import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Medication,
  MedicationDocument,
} from './schemas/medication.schema/medication.schema';
import { MedicationRequestDto } from './dto/medication-request.dto/medication-request.dto';

@Injectable()
export class MedicationService {
  constructor(
    @InjectModel(Medication.name)
    private readonly medicationModel: Model<MedicationDocument>,
  ) {}

  async add(patientId: string, dto: MedicationRequestDto) {
    return this.medicationModel.create({
      ...dto,
      reminderTime: new Date(dto.reminderTime),
      patientId,
      isTaken: false,
    });
  }

  async getMyMedications(patientId: string) {
    return this.medicationModel
      .find({ patientId })
      .sort({ reminderTime: 1 })
      .exec();
  }

  async markTaken(id: string, patientId: string) {
    const medication = await this.medicationModel.findOneAndUpdate(
      { _id: id, patientId },
      { isTaken: true },
      { new: true },
    );

    if (!medication) {
      throw new NotFoundException('Medication not found');
    }

    return medication;
  }

  async update(
    id: string,
    patientId: string,
    dto: MedicationRequestDto,
  ) {
    const medication = await this.medicationModel.findOneAndUpdate(
      { _id: id, patientId },
      {
        ...dto,
        reminderTime: new Date(dto.reminderTime),
      },
      { new: true, runValidators: true },
    );

    if (!medication) {
      throw new NotFoundException('Medication not found');
    }

    return medication;
  }

  async delete(id: string, patientId: string) {
    const medication = await this.medicationModel.findOneAndDelete({
      _id: id,
      patientId,
    });

    if (!medication) {
      throw new NotFoundException('Medication not found');
    }

    return { message: 'Medication deleted successfully' };
  }
}
