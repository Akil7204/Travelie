import mongoose, { Schema, Document } from "mongoose";
import { User } from "../domain/user";
import { Trip, Trips } from "../domain/trips";

// Extending the User interface with mongoose Document
interface UserModel extends User, Document {
  otp?: string;
  otpVerified?: boolean;
}

// Define the Mongoose schema for the User
const UserSchema: Schema<UserModel> = new Schema({
  username: { type: String, required: true },
  phone: { type: Number },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: "/img/DefaultProfilePicMale.png" },
  otp: { type: String },
  otpVerified: { type: Boolean, default: false },
});

// Create the Mongoose model
const UserModel = mongoose.model<UserModel>("User", UserSchema);

// Function to create a new user
export const createUser = async (user: User) => {
  const newUser = new UserModel(user);
  return newUser.save();
};

// Function to find a user by email
export const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};

// Function to update a user by email
export const updateUser = async (email: string, update: Partial<User>) => {
  return UserModel.findOneAndUpdate({ email }, update, { new: true });
};

// Function to find a user by email and password
export const findUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  return UserModel.findOne({ email, password });
};

// Function to update the user's profile by user ID
export const updateUserProfile = async (
  userId: string,
  update: Partial<User>
) => {
  return UserModel.findByIdAndUpdate(userId, update, { new: true });
};

export const allTripsFromDB = async () => {

  return await Trips.find().sort({
    createdAt: -1,
  });
};

// Function to find a user by ID
export const findUserById = async (userId: string) => {
  return UserModel.findById(userId);
};

export const getDetailTrip = async (id: string): Promise<Trip | null> => {
  return await Trips.findById(id);
};

