import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { existsSync } from 'fs';

import { Prescription, PrescriptionDocument } from './schemas/prescription.schema.js';

@Injectable()
export class PharmacyService {
  constructor(
    @InjectModel(Prescription.name)
    private readonly prescriptionModel: Model<PrescriptionDocument>,
  ) {}

  async uploadPrescription(patientId: string, imagePath: string) {
    return this.prescriptionModel.create({ patientId, imagePath, status: 'Pending' });
  }

  async getImage(orderId: string) {
    const prescription = await this.prescriptionModel.findById(orderId).exec();
    if (!prescription || !existsSync(prescription.imagePath)) throw new NotFoundException('Prescription image not found');
    return prescription.imagePath;
  }

  async getMyOrders(patientId: string) {
    return this.prescriptionModel.find({ patientId }).sort({ createdAt: -1 }).exec();
  }
}
