import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { BorrowingModule } from './borrowing/borrowing.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ReportingModule } from './reporting/reporting.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    BooksModule,
    BorrowingModule,
    NotificationsModule,
    ReportingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
