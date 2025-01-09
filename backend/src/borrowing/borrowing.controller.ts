import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { BorrowingRecordService } from '../borrowing/borrowing.service';
import { CreateBorrowingRecordDto } from '../borrowing/create-borrowing-record.dto';
import { BorrowingRecord } from '../borrowing/borrowing.schema';

@Controller('borrowing-records')
export class BorrowingRecordController {
  constructor(
    private readonly borrowingRecordService: BorrowingRecordService,
  ) {}
  @Post(':bookId')
  async create(
    @Param('bookId') bookId: string,
    @Body() createBorrowingRecordDto: CreateBorrowingRecordDto,
  ): Promise<BorrowingRecord> {
    const record = { ...createBorrowingRecordDto, bookId };

    return this.borrowingRecordService.create(record);
  }

  @Get()
  async findAll(): Promise<BorrowingRecord[]> {
    return this.borrowingRecordService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BorrowingRecord> {
    return this.borrowingRecordService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<BorrowingRecord> {
    return this.borrowingRecordService.delete(id);
  }
}
