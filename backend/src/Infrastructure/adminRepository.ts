import mongoose, { Schema, Document } from "mongoose";
import { Admin } from "../domain/admin";
import { Company, CompanyModel } from "../domain/company";

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
