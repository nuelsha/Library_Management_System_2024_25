import { Controller, Post, Put, Body, Param } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { BorrowRecord } from './entities/borrow-record.entity';

@Controller('api/borrow')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Post()
  borrowBook(@Body() borrowDto: { userId: string; bookId: string }): Promise<BorrowRecord> {
    return this.borrowingService.borrowBook(borrowDto.userId, borrowDto.bookId);
  }

  @Put('approve/:id')
  approveBorrow(@Param('id') id: string): Promise<void> {
    return this.borrowingService.approveBorrow(id);
  }
} 