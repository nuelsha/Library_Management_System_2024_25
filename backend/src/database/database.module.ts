import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      serverSelectionTimeoutMS: 5000,
    }),
  ],
})
export class DatabaseModule {}

console.log(process.env.DATABASE_URL);
