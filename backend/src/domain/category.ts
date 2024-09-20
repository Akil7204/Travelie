import mongoose, { Schema, Document } from "mongoose";

// Updated interface with _id included
export interface ICategory extends Document {
  name: string;
  companyId: mongoose.Schema.Types.ObjectId;
  isDeleted: boolean;
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", // it is reference of company
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Ensure the model is typed correctly with ICategory
export const Category = mongoose.model<ICategory>("Category", CategorySchema);
