import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowingRecordController } from '../controller/borrowing.controller';
import { BorrowingRecordService } from '../service/borrowing.service';
import {
  BorrowingRecord,
  BorrowingRecordSchema,
} from '../schema/borrowing.schema';

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
