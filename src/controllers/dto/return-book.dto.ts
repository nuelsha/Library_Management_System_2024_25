import { IsDateString } from 'class-validator';

export class ReturnBookDto {
  @IsDateString({}, { message: 'returnDate must be a valid ISO 8601 date string' })
  returnDate: string;
}
