// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type UserDocument = User & Document;

// @Schema()
// export class User {
//   @Prop()
//   userId: string;

//   @Prop()
//   email: string;

//   @Prop()
//   firstname: string;

//   @Prop()
//   lastname: string;

//   @Prop()
//   role: string;
// }

// export const UserSchema = SchemaFactory.createForClass(User);
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  role: { type: String, enum: ['admin', 'member', 'guest'] },
  email: { type: String, unique: true },
});

export interface UserDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  role: 'admin' | 'member' | 'guest';
  email: string;
}