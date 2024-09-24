import mongoose, { Document, Schema } from "mongoose";

interface Report extends Document {
  companyId: mongoose.Schema.Types.ObjectId;
  message: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const reportSchema = new Schema<Report>({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company", 
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
}, { timestamps: true });

export const ReportModel = mongoose.model<Report>("Report", reportSchema);
