import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { User } from '../schema/users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<User> {
    return this.usersService.findById(userId);
  }
}
