import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BorrowRequest, BorrowRequestDocument } from '../schemas/borrow-request.schema';
import { BorrowRecord,BorrowRecordDocument } from 'src/schemas/borrow-record.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(BorrowRequest.name) private borrowRequestModel: Model<BorrowRequestDocument>,
    @InjectModel(BorrowRecord.name) private borrowRecordModel: Model<BorrowRecordDocument>,
  ) {}

  async approveBorrowRequest(requestId: string) {
    // Find the borrow request by ID
    const borrowRequest = await this.borrowRequestModel.findById(requestId).populate('book');
    if (!borrowRequest) throw new NotFoundException('Borrow request not found');
  
    // Check if the request is still pending
    if (borrowRequest.status !== 'pending') {
      throw new Error('Cannot approve a non-pending request');
    }
  
    // Mark the book as unavailable
    const book = borrowRequest.book as any;
    if (!book.availableCopies || book.availableCopies <= 0) {
      throw new Error('Book is already unavailable');
    }
    book.availableCopies -= 1;
    await book.save();
  
    // Create a new borrow record
    const borrowRecord = new this.borrowRecordModel({
      user: borrowRequest.user,
      book: borrowRequest.book,
      borrowDate: new Date(),
    });
    await borrowRecord.save();
  
    // Delete the borrow request
    await this.borrowRequestModel.findByIdAndDelete(requestId);
  
    return borrowRecord; // Return the created borrow record
  }
  

  async rejectBorrowRequest(requestId: string) {
    const borrowRequest = await this.borrowRequestModel.findById(requestId);
    if (!borrowRequest) throw new NotFoundException('Borrow request not found');
    
    borrowRequest.status = 'rejected';
    await borrowRequest.save();
    
    return borrowRequest;
  }


  async getAllBorrowRequests() {
    return this.borrowRequestModel.find().populate('user').populate('book');
  }
  async getAllBorrowRecords() {
    return this.borrowRecordModel.find().populate('user').populate('book');
  }
}
