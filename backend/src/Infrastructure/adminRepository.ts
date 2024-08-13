import mongoose, { Schema, Document } from "mongoose";
import { Admin } from "../domain/admin";

// Define the Mongoose schema for the User
const AdminSchema: Schema<Admin> = new Schema({
  adminName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the Mongoose model
const AdminModel = mongoose.model<Admin>("Admin", AdminSchema);

export const findUserByEmailAdmin = async (
  email: string
): Promise<Admin | null> => {
  const admin = await AdminModel.findOne({ email });
  return admin ? admin.toObject() : null;
};
