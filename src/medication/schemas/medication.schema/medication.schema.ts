import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MedicationDocument = HydratedDocument<Medication>;

@Schema({ timestamps: true })
export class Medication {
  @Prop({ required: true })
  medName!: string;

  @Prop({ required: true })
  dosage!: string;

  @Prop({ required: true, type: Date })
  reminderTime!: Date;

  @Prop({ required: true })
  patientId!: string;

  @Prop({ default: false })
  isTaken!: boolean;
}

export const MedicationSchema = SchemaFactory.createForClass(Medication);
