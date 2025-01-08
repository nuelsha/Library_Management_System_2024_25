import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  ISBN: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  availability: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
