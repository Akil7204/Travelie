import mongoose, { Schema, Document } from "mongoose";

interface Report extends Document {
  companyId: mongoose.Schema.Types.ObjectId;
  message: string;
  createdAt: Date;
}

const reportSchema = new Schema<Report>({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ReportModel = mongoose.model<Report>("Report", reportSchema);
