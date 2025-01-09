import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowingRecordController } from './borrowing.controller';
import { BorrowingRecordService } from './borrowing.service';
import { BorrowingRecord, BorrowingRecordSchema } from './borrowing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BorrowingRecord.name, schema: BorrowingRecordSchema },
    ]),
  ],
  controllers: [BorrowingRecordController],
  providers: [BorrowingRecordService],
})
export class BorrowingModule {}
