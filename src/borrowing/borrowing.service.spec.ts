import { Test, TestingModule } from '@nestjs/testing';
import { BorrowingService } from './borrowing.service';
import { BorrowRecord, BorrowRecordStatus } from './entities/borrow-record.entity';
import { Book, BookStatus } from './entities/book.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

describe('BorrowingService', () => {
  let service: BorrowingService;
  let borrowRepo: Repository<BorrowRecord>;
  let bookRepo: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BorrowingService,
        {
          provide: getRepositoryToken(BorrowRecord),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Book),
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BorrowingService>(BorrowingService);
    borrowRepo = module.get<Repository<BorrowRecord>>(getRepositoryToken(BorrowRecord));
    bookRepo = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should borrow a book', async () => {
    const userId = 'user-id';
    const bookId = 'book-id';
    const book = new Book();
    book.id = bookId;
    book.status = BookStatus.AVAILABLE;

    jest.spyOn(bookRepo, 'findOne').mockResolvedValue(book);
    jest.spyOn(bookRepo, 'update').mockResolvedValue({ affected: 1, raw: [], generatedMaps: [] });
    jest.spyOn(borrowRepo, 'create').mockReturnValue(new BorrowRecord());
    jest.spyOn(borrowRepo, 'save').mockResolvedValue(new BorrowRecord());

    const result = await service.borrowBook(userId, bookId);
    expect(result).toBeInstanceOf(BorrowRecord);
    expect(bookRepo.update).toHaveBeenCalledWith(bookId, { status: BookStatus.BORROWED });
  });

  it('should throw an error when book is not available', async () => {
    const userId = 'user-id';
    const bookId = 'book-id';
    jest.spyOn(bookRepo, 'findOne').mockResolvedValue(null);

    try {
      await service.borrowBook(userId, bookId);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('should approve a borrow request', async () => {
    const record = new BorrowRecord();
    record.status = BorrowRecordStatus.PENDING;
    jest.spyOn(borrowRepo, 'findOne').mockResolvedValue(record);
    jest.spyOn(borrowRepo, 'save').mockResolvedValue(record);

    await service.approveBorrow('record-id');
    expect(record.status).toBe(BorrowRecordStatus.APPROVED);
  });
}); 