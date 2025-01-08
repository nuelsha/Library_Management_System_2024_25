import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../books/books.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  async create(bookData: Partial<Book>): Promise<Book> {
    const newBook = new this.bookModel(bookData);
    console.log('Book successfully created!');
    return newBook.save();
  }

  async update(id: string, bookData: Partial<Book>): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, bookData, { new: true }).exec();
  }

  async delete(id: string): Promise<Book> {
    return this.bookModel.findByIdAndDelete(id).exec();
  }
}
