import { Controller, Patch, Param, Get } from '@nestjs/common';
import { AdminService } from '../services/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("/borrow-requests")
  getAllBorrowRequests() {
    return this.adminService.getAllBorrowRequests();
  }
  @Get("/borrow-records")
  getAllBorrowRecords() {
    return this.adminService.getAllBorrowRecords();
  }
  @Patch('approve/:id')
  approveBorrowRequest(@Param('id') borrowRequestId: string) {
    return this.adminService.approveBorrowRequest(borrowRequestId);
  }

  @Patch('reject/:id')
  rejectBorrowRequest(@Param('id') borrowRequestId: string) {
    return this.adminService.rejectBorrowRequest(borrowRequestId);
  }
}
