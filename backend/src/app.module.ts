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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Makes the config globally available
      envFilePath: 'C:/Users/Admin/Desktop/library3/.env',  // Specify the path to the .env file
    }),
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

