import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../schemas/book.schema';
import { CreateBookDto } from '../controllers/dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  // Create a new book
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  // Find all books
  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  // Find a book by ID
  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  // Update a book
  async update(id: string, updateBookDto: Partial<CreateBookDto>): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    Object.assign(book, updateBookDto);
    await book.save();
    return book;
  }
}
