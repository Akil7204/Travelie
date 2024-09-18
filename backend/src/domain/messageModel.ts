import mongoose, { Document, Schema } from "mongoose";

interface IMessage extends Document {
  chatId: mongoose.Schema.Types.ObjectId;  // Reference to chat
  senderId: mongoose.Schema.Types.ObjectId;  // Reference to the sender (User or Company)
  senderModel: "User" | "Company";  // To differentiate between User and Company
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
      required: true,
      refPath: 'senderModel',  // Dynamically reference either "User" or "Company"
    },
    senderModel: {
      type: String,
      enum: ["User", "Company"],  // To specify the model reference type
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }  
);

// No need to use a pre-find hook; `refPath` handles dynamic population automatically
export const messageModel = mongoose.model<IMessage>("Message", MessageSchema);
