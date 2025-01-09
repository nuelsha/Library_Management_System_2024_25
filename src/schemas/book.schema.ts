import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  isbn: string;

  @Prop({ required: true })
  availableCopies: number;
}

// Create the schema for Book using SchemaFactory
export const BookSchema = SchemaFactory.createForClass(Book);

