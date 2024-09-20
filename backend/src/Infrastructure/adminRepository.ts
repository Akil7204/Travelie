import mongoose, { Schema, Document } from "mongoose";
import { Admin } from "../domain/admin";
import { Company, CompanyModel } from "../domain/company";
import { User, UserModel } from "../domain/user";

// Define the Mongoose schema for the User
const AdminSchema: Schema<Admin> = new Schema({
  adminName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the Mongoose model
export const AdminModel = mongoose.model<Admin>("Admin", AdminSchema);

export const findUserByEmailAdmin = async (
  email: string
): Promise<Admin | null> => {
  const admin = await AdminModel.findOne({ email });
  return admin ? admin : null;
};

export const getAllUnapprovalFromDB = async () => {
  return await CompanyModel.find({ adminVerified: false }).sort({
    createdAt: -1,
  });
};

export const updateCompanyFromDB = async (id: string) => {
  return await CompanyModel.findOneAndUpdate(
    { _id: id }, 
    { $set: { adminVerified: true } }, 
    {
      returnOriginal: false, 
      upsert: false, 
    }
  );
};

// Fetch all users
export const findAllUsers = async (): Promise<User[]> => {
  return UserModel.find(); 
};

// Function to block a user by ID
export const blockUserById = async (userId: string) => {
  return UserModel.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
};

// Function to unblock a user by ID
export const unblockUserById = async (userId: string) => {
  return UserModel.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
};

export const getAllCompaniesFromDB = async () => {
  return CompanyModel.find().sort({ createdAt: -1 })
};

export const blockCompanyById = async (companyId: string) => {
  return CompanyModel.findByIdAndUpdate(companyId, { isBlocked: true }, { new: true });
};

export const unblockCompanyById = async (companyId: string) => {
  return CompanyModel.findByIdAndUpdate(companyId, { isBlocked: false }, { new: true });
};
