import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BorrowRequest, BorrowRequestDocument } from '../schemas/borrow-request.schema';
import { BorrowRecord, BorrowRecordDocument } from '../schemas/borrow-record.schema';
import { Book, BookDocument } from '../schemas/book.schema';

@Injectable()
export class BorrowService {
  constructor(
    @InjectModel(BorrowRequest.name) private borrowRequestModel: Model<BorrowRequestDocument>,
    @InjectModel(BorrowRecord.name) private borrowRecordModel: Model<BorrowRecordDocument>,
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
  ) {}

  // Create a borrow request
  async createBorrowRequest(data: { userId: string; bookId: string }) {
    const book = await this.bookModel.findById(data.bookId);
    if (!book) throw new NotFoundException('Book not found');
    if (book.availableCopies <= 0) throw new BadRequestException('No available copies for this book');

    const borrowRequest = new this.borrowRequestModel({
      user: data.userId,
      book: data.bookId,
      status: 'pending',
    });

    return borrowRequest.save();
  }

  // Return a borrowed book
  async returnBook(borrowId: string, returnBookDto: { returnDate: string }) {
    const borrowRecord = await this.borrowRecordModel.findById(borrowId).populate('book');
    if (!borrowRecord) throw new NotFoundException('Borrow record not found');

    // Update the return date
    borrowRecord.returnDate = new Date(returnBookDto.returnDate);

    // Check if the book is overdue
    if (borrowRecord.returnDate > new Date()) {
      borrowRecord.overdue = false; 
    } else {
      borrowRecord.overdue = true;
    }

    // Save the updated record
    await borrowRecord.save();

    // Mark the book as available again
    const book = borrowRecord.book as any; 
    book.available = true;
    await book.save();

    return borrowRecord; 
  }

  // Borrow a book (create borrow record)
  async borrowBook(borrowRequestId: string) {
    const borrowRequest = await this.borrowRequestModel.findById(borrowRequestId);
    if (!borrowRequest) throw new NotFoundException('Borrow request not found');
    if (borrowRequest.status !== 'pending') throw new BadRequestException('Borrow request is not pending');

    const book = await this.bookModel.findById(borrowRequest.book);
    if (!book) throw new NotFoundException('Book not found');
    if (book.availableCopies <= 0) throw new BadRequestException('No available copies to borrow');

    // Update book availability
    book.availableCopies -= 1;
    await book.save();

    // Create a borrow record
    const borrowRecord = new this.borrowRecordModel({
      user: borrowRequest.user,
      book: borrowRequest.book,
      borrowDate: new Date(),
    });

    // Mark the borrow request as completed
    borrowRequest.status = 'approved';
    await borrowRequest.save();

    return borrowRecord.save();
  }

}
