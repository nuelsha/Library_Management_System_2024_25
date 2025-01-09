import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { BorrowService } from '../services/borrow.service';
import { CreateBorrowRequestDto } from './dto/create-borrow-request.dto';
import { ReturnBookDto } from './dto/return-book.dto';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

 
  @Post()
  createBorrowRequest(@Body() createBorrowRequestDto: CreateBorrowRequestDto) {
    return this.borrowService.createBorrowRequest(createBorrowRequestDto);
  }

  @Put(':id/return')
  returnBook(@Param('id') borrowId: string, @Body() returnBookDto: ReturnBookDto) {
    return this.borrowService.returnBook(borrowId, returnBookDto);
  }
  
}
