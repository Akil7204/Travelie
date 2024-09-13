import mongoose, { Document, Schema } from "mongoose";

interface IMessage extends Document {
  chatId: mongoose.Schema.Types.ObjectId;  // Reference to chat
  senderId: mongoose.Schema.Types.ObjectId;  // Reference to the sender (user)
  text: string; 
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
      ref: "User",  
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }  
);

export const messageModel = mongoose.model<IMessage>("Message", MessageSchema);

