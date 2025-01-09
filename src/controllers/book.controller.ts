import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: Partial<CreateBookDto>) {
    return this.bookService.update(id, updateBookDto);
  }
}
