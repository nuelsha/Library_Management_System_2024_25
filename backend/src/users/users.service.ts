import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Create a new user
  async create(userData: Partial<User>): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  // Find a user by ID
  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Update a user by ID
  async update(userId: string, updateData: Partial<User>): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(userId, updateData, {
        new: true,
      })
      .exec();
  }

  // Delete a user by ID
  async delete(userId: string): Promise<User> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }
}
