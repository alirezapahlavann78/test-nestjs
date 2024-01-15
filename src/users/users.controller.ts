import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User {
    return this.users.find(user => user.id === id);
  }

  getUserByEmail(email: string): User {
    return this.users.find(user => user.email === email);
  }

  createUser(user: User): void {
    const existingUser = this.getUserByEmail(user.email);
    if (!existingUser) {
      this.users.push(user);
    } else {
      throw new Error('Email is already in use');
    }
  }

  updateUser(id: number, updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }
}
