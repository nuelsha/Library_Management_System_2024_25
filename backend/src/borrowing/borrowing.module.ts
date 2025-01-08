import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowingRecord, BorrowingRecordSchema } from './borrowing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BorrowingRecord.name, schema: BorrowingRecordSchema },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class BorrowingModule {}
