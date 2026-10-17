import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ required: true, type: Number })
  providerId!: number;

  @Prop({ required: true, type: Date })
  appointmentDate!: Date;

  @Prop({ default: '' })
  notes!: string;

  @Prop({ required: true, type: String })
  patientId!: string;

  @Prop({ default: 'Pending', type: String })
  status!: string;
}

export const AppointmentSchema =
  SchemaFactory.createForClass(Appointment);
  