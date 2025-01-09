import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { User, UserSchema } from './schemas/user.schema';
import { BorrowController } from './controllers/borrow.controller';
import { AdminController } from './controllers/admin.controller';
import { BorrowService } from './services/borrow.service';
import { AdminService } from './services/admin.service';
import { BorrowRequest, BorrowRequestSchema } from './schemas/borrow-request.schema';
import { BorrowRecord, BorrowRecordSchema } from './schemas/borrow-record.schema';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { BookController } from './controllers/book.controller';
import { BookService } from './services/book.service';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost:27017/borrowing-management'),
  MongooseModule.forFeature([
    { name: Book.name, schema: BookSchema },
    { name: User.name, schema: UserSchema },
    { name: BorrowRequest.name, schema: BorrowRequestSchema },
    { name: BorrowRecord.name, schema: BorrowRecordSchema },
  ])
],
  controllers: [AppController,BorrowController, AdminController,UserController,BookController],
  providers: [AppService,BorrowService, AdminService,UserService,BookService],
})
export class AppModule {}
