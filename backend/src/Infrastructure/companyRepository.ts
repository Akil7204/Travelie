import mongoose, { Schema, Document } from "mongoose";
import { Company } from "../domain/company";

// Extending the Company interface with mongoose Document
interface CompanyModel extends Company, Document {
  otp?: string;
  otpVerified?: boolean;
}

// Define the Mongoose schema for the Company
const CompanySchema: Schema<CompanyModel> = new Schema({
  companyname: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  adminVerified: { type: Boolean, default: false},
  otp: { type: String },
  otpVerified: { type: Boolean, default: false },
});

// Create the Mongoose model
export const CompanyModel = mongoose.model<CompanyModel>("Company", CompanySchema);

// Function to create a new user
export const createCompany = async (company: Company) => {
  const newCompany = new CompanyModel(company);
  return newCompany.save();
};

// Function to find a comapany by email
export const findCompanyByEmail = async (email: string) => {
  return CompanyModel.findOne({ email });
};

// Function to update a company by email
export const updateCompany = async (email: string, update: Partial<Company>) => {
  return CompanyModel.findOneAndUpdate({ email }, update, { new: true });
};

// Function to find a company by email and password
export const findCompanyByEmailAndPassword = async (
  email: string,
  password: string
) => {
  return CompanyModel.findOne({ email, password });
};




