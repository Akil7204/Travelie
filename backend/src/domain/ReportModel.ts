
import { Schema, Document } from "mongoose";
import mongoose from "mongoose";


export interface IReport extends Document {
  companyId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;    
  message: string;
  status: "Pending" | "Resolved" | "Dismissed";
  createdAt: Date;
  updatedAt: Date;
}


const reportSchema = new Schema<IReport>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",  
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Resolved", "Dismissed"],
      default: "Pending",
    },
  },
  { timestamps: true } 
);


export const ReportModel = mongoose.model<IReport>("Report", reportSchema);



