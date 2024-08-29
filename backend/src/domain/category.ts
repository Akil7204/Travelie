import mongoose, { Schema, Document } from 'mongoose';

// Updated interface with _id included
export interface ICategory extends Document {
  _id: mongoose.Types.ObjectId; 
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Ensure the model is typed correctly with ICategory
export const Category = mongoose.model<ICategory>('Category', CategorySchema);