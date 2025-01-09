import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: false })
  isAdmin: boolean;  // Whether the user is an admin

  @Prop({ default: true })
  isActive: boolean;  // Whether the user is active
}

export const UserSchema = SchemaFactory.createForClass(User);
