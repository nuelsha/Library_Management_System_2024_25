import { Controller, Get } from '@nestjs/common';
import { ReportingService } from './reporting.service';

@Controller('reporting')
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get('trends')
  async getBorrowingTrends() {
    return this.reportingService.getBorrowingTrends();
  }

  @Get('overdue')
  async getOverdueBooks() {
    return this.reportingService.getOverdueBooks();
  }
}
