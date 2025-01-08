import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true }) // Explicitly declare that `username` is required
  username!: string;

  @Prop({ required: true }) // Explicitly declare that `password` is required
  password!: string;

  @Prop({ type: [String], default: [] }) // Explicitly declare `roles` as an array of strings with default empty array
  roles!: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
