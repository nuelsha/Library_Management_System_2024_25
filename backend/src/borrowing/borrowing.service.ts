import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { BorrowingRecord } from './borrowing.schema';
import { CreateBorrowingRecordDto } from './create-borrowing-record.dto';

@Injectable()
export class BorrowingRecordService {
  constructor(
    @InjectModel(BorrowingRecord.name)
    private borrowingRecordModel: Model<BorrowingRecord>,
  ) {}

  private isValidObjectId(id: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }

  async create(
    createBorrowingRecordDto: CreateBorrowingRecordDto,
  ): Promise<BorrowingRecord> {
    try {
      const { userId, bookId } = createBorrowingRecordDto;
      console.log(userId, bookId);

      if (!this.isValidObjectId(userId) || !this.isValidObjectId(bookId)) {
        throw new Error('Invalid userId or bookId');
      }

      const borrowingRecord = new this.borrowingRecordModel({
        userId: new Types.ObjectId(userId),
        bookId: new Types.ObjectId(bookId),
        ...createBorrowingRecordDto,
      });

      console.log(borrowingRecord);

      return await borrowingRecord.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<BorrowingRecord[]> {
    try {
      return await this.borrowingRecordModel
        .find()
        .populate('userId')
        .populate('bookId');
    } catch (error) {
      throw new Error('Failed to retrieve borrowing records');
    }
  }

  async findOne(id: string): Promise<BorrowingRecord> {
    try {
      const record = await this.borrowingRecordModel
        .findById(id)
        .populate('userId')
        .populate('bookId');
      if (!record) {
        throw new NotFoundException(`Borrowing record with ID ${id} not found`);
      }
      return record;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<BorrowingRecord> {
    try {
      const deletedRecord =
        await this.borrowingRecordModel.findByIdAndDelete(id);
      if (!deletedRecord) {
        throw new NotFoundException(`Borrowing record with ID ${id} not found`);
      }
      return deletedRecord;
    } catch (error) {
      throw new Error('Failed to delete borrowing record');
    }
  }
}
