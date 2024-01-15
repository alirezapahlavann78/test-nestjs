import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

  async getAllUsers(page: number = 1, limit: number = 10): Promise<UserDocument[]> {
    const skip = (page - 1) * limit;
    return this.userModel.find().skip(skip).limit(limit).exec();
  }
  async getUserById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(user: UserDocument): Promise<UserDocument> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async updateUser(id: string, updatedUser: UserDocument): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, updatedUser, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
  // constructor(private readonly usersRepository: UsersRepository) {}

  // async getUserById(userId: string): Promise<User> {
  //   return this.usersRepository.findOne({ userId });
  // }

  // async getUsers(): Promise<User[]> {
  //   return this.usersRepository.find({});
  // }

  // async createUser(createUserDto): Promise<User> {
  //   const { email, firstname, lastname, role } = createUserDto;
  //   return this.usersRepository.create({
  //     userId: uuidv4(),
  //     email,
  //     firstname,
  //     lastname,
  //     role,
  //   });
  // }

  // async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
  //   return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
  // }
}
