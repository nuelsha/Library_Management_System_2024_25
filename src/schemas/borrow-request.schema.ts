import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BorrowRequestDocument = HydratedDocument<BorrowRequest>;

@Schema()
export class BorrowRequest {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  book: Types.ObjectId;

  @Prop({ default: 'pending' })
  status: string; // 'pending', 'approved', 'rejected'

  @Prop({ default: Date.now })
  requestDate: Date;
}

export const BorrowRequestSchema = SchemaFactory.createForClass(BorrowRequest);
