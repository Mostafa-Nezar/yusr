import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PrescriptionDocument = HydratedDocument<Prescription>;

@Schema({ timestamps: true })
export class Prescription {
  @Prop({ required: true })
  patientId!: string;

  @Prop({ required: true })
  imagePath!: string;

  @Prop({ default: 'Pending' })
  status!: string;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
