import { Test, TestingModule } from '@nestjs/testing';
import { BorrowingController } from './borrowing.controller';
import { BorrowingService } from './borrowing.service';
import { BorrowRecord } from './entities/borrow-record.entity';
import { BadRequestException } from '@nestjs/common';

describe('BorrowingController', () => {
  let controller: BorrowingController;
  let service: BorrowingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowingController],
      providers: [
        {
          provide: BorrowingService,
          useValue: {
            borrowBook: jest.fn(),
            approveBorrow: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BorrowingController>(BorrowingController);
    service = module.get<BorrowingService>(BorrowingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should borrow a book', async () => {
    const userId = 'user-id';
    const bookId = 'book-id';
    jest.spyOn(service, 'borrowBook').mockResolvedValue(new BorrowRecord());
    const result = await controller.borrowBook({ userId, bookId });
    expect(result).toBeInstanceOf(BorrowRecord);
  });

  it('should approve a borrow request', async () => {
    jest.spyOn(service, 'approveBorrow').mockResolvedValue(undefined);
    await controller.approveBorrow('record-id');
    expect(service.approveBorrow).toHaveBeenCalledWith('record-id');
  });
}); 