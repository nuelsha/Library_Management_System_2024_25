import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';

interface User {
  id: number;
  username: string;
  password: string;
  roles: string[];
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, roles } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: this.users.length + 1,
      username,
      password: hashedPassword,
      roles,
    };
    this.users.push(newUser);
    return newUser;
  }
}
