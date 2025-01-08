import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowRecord, BorrowRecordStatus } from './entities/borrow-record.entity';
import { Book, BookStatus } from './entities/book.entity';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectRepository(BorrowRecord)
    private borrowRepo: Repository<BorrowRecord>,
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  async borrowBook(userId: string, bookId: string): Promise<BorrowRecord> {
    const book = await this.bookRepo.findOne({ where: { id: bookId } });
    if (!book || book.status !== BookStatus.AVAILABLE) {
      throw new BadRequestException('Book not available');
    }

    const borrowRecord = this.borrowRepo.create({
      user: { id: userId },
      book: { id: bookId },
      borrowDate: new Date(),
      status: BorrowRecordStatus.PENDING,
    });

    await this.bookRepo.update(bookId, { status: BookStatus.BORROWED });
    return this.borrowRepo.save(borrowRecord);
  }

  async approveBorrow(id: string): Promise<void> {
    const record = await this.borrowRepo.findOne({ where: { id } });
    if (!record || record.status !== BorrowRecordStatus.PENDING) {
      throw new BadRequestException('Invalid request');
    }
    record.status = BorrowRecordStatus.APPROVED;
    await this.borrowRepo.save(record);
  }
} 