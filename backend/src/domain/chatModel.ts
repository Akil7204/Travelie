import mongoose, { Document, Schema } from "mongoose";

interface IChat extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  companyId: mongoose.Schema.Types.ObjectId;
  lastMessage: string;
}

const ChatSchema = new Schema<IChat>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    lastMessage: {
      type: String,
      required: false, 
    },
  },
  { timestamps: true }
);

export const chatModel = mongoose.model<IChat>("Chat", ChatSchema);
