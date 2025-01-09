import { IsMongoId, IsDateString, IsOptional } from 'class-validator';

export class CreateBorrowingRecordDto {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  bookId: string;

  @IsDateString()
  borrowDate: Date;

  @IsOptional()
  @IsDateString()
  returnDate?: Date;
}
