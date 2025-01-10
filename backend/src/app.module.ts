import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users.module';
import { BooksModule } from './module/books.module';
import { BorrowingModule } from './module/borrowing.module';
import { NotificationsModule } from './module/notifications.module';
import { DatabaseModule } from './database/database.module';

// Import your custom AuthModule
import { AuthModule } from './module/auth/auth.module';

// Import your custom UsersModule (if this is different from the original UsersModule)
import { UsersModule as CustomUsersModule } from './users/users.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule, // Original UsersModule
    BooksModule,
    BorrowingModule,
    NotificationsModule,
    AuthModule, // Your custom AuthModule for authentication
    CustomUsersModule, // Your custom UsersModule, if different from the original
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
