import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './module/books.module';
import { BorrowingModule } from './module/borrowing.module';
import { NotificationsModule } from './module/notifications.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    BooksModule,
    BorrowingModule,
    NotificationsModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist'), 
      exclude: ['/api*'], 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
