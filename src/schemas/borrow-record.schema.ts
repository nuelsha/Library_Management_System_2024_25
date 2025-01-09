import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BorrowRecordDocument = HydratedDocument<BorrowRecord>;

@Schema()
export class BorrowRecord {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  book: Types.ObjectId;

  @Prop({ default: Date.now })
  borrowDate: Date;

  @Prop({ type: Date })
  returnDate: Date;

  @Prop({ default: false })
  overdue: boolean;
}

export const BorrowRecordSchema = SchemaFactory.createForClass(BorrowRecord);
