import mongoose, { Schema, Document } from "mongoose";

export interface User {
  username: string;
  phone?: number;
  email: string;
  password: string;
  profileImage?: string;
  otp?: string;
  otpVerified?: boolean;
  isBlocked?: boolean; 
}

const UserSchema: Schema<User> = new Schema({
  username: { type: String, required: true },
  phone: { type: Number },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: "/img/DefaultProfilePicMale.png" },
  otp: { type: String },
  otpVerified: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false }, 
});

// Create the Mongoose model
export const UserModel = mongoose.model<User>("User", UserSchema);
