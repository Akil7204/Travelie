import mongoose, { Schema } from "mongoose";

export interface Company {
    companyname: string;
    phone: number;
    email: string;
    password: string;
    profileImage?: string;
    otp?: string;
    otpVerified?: boolean; 
    adminVerified?: boolean;
}


const CompanySchema: Schema<Company> = new Schema({
    companyname: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    adminVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpVerified: { type: Boolean, default: false },
  });
  
  // Create the Mongoose model
  export const CompanyModel = mongoose.model<Company>(
    "Company",
    CompanySchema
  );