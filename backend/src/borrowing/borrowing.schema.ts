import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class BorrowingRecord extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Book', required: true })
  bookId: string;

  @Prop({ required: true })
  borrowDate: Date;

  @Prop()
  returnDate: Date;

  @Prop({ enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' })
  approvalStatus: string;
}

export const BorrowingRecordSchema =
  SchemaFactory.createForClass(BorrowingRecord);
