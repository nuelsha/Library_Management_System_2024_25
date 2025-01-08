import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BorrowingRecord } from '../borrowing/borrowing.schema';

@Injectable()
export class ReportingService {
  constructor(
    @InjectModel(BorrowingRecord.name)
    private recordModel: Model<BorrowingRecord>,
  ) {}

  async getBorrowingTrends() {
    return this.recordModel.aggregate([
      { $group: { _id: '$bookId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async getOverdueBooks() {
    const now = new Date();
    return this.recordModel.find({
      returnDate: { $lt: now },
      approvalStatus: 'Approved',
    });
  }
}
