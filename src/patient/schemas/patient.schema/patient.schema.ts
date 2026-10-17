import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PatientDocument = HydratedDocument<Patient>;

@Schema({ timestamps: true })
export class Patient {
  @Prop({ required: true, unique: true })
  userId!: string;

  @Prop({ default: '' })
  medicalCondition!: string;

  @Prop({ required: true, min: 0 })
  age!: number;

  @Prop({ default: '' })
  emergencyContact!: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
