import mongoose, { Document, Schema } from "mongoose";

interface IMessage extends Document {
  chatId: mongoose.Schema.Types.ObjectId; 
  senderId: mongoose.Schema.Types.ObjectId; 
  senderModel: "User" | "Company"; 
  text: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel",
    },
    senderModel: {
      type: String,
      enum: ["User", "Company"],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


export const messageModel = mongoose.model<IMessage>("Message", MessageSchema);
