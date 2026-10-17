import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProviderDocument = HydratedDocument<Provider>;

@Schema({ timestamps: true })
export class Provider {
  @Prop({ required: true, unique: true })
  userId!: string;

  @Prop({ default: '' })
  specialty!: string;

  @Prop({ default: '' })
  bio!: string;

  @Prop({ default: '' })
  address!: string;

  @Prop({ default: 0, type: Number })
  price!: number;

  @Prop({ default: false })
  isAvailable!: boolean;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
