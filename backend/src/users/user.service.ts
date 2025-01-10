import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      $or: [
        { email: createUserDto.email },
        { username: createUserDto.username }
      ]
    }).exec();

    if (existingUser) {
      throw new Error('User already exists');
    }

    const { username, password, email } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });

    return newUser.save();
  }
}
