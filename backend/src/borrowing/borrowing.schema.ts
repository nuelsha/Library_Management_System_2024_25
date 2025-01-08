import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema()
export class BorrowingRecord extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true })
  bookId: string;

  @Prop({ required: true })
  borrowDate: Date;

  @Prop()
  returnDate: Date;

  @Prop({ default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] })
  approvalStatus: string;
}

export const BorrowingRecordSchema =
  SchemaFactory.createForClass(BorrowingRecord);
