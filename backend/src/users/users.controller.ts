import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return this.usersService.create(userData);
  }

  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<User> {
    return this.usersService.findById(userId);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return this.usersService.update(userId, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<User> {
    return this.usersService.delete(userId);
  }
}
