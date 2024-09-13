import mongoose, { Document, Schema } from "mongoose";

interface Ichat extends Document {
  members: String[];
}

const ChatSchema = new Schema<Ichat>(
  {
    members: {
      type: [String],
    },
  },
  { timestamps: true }
);

export const chatModel = mongoose.model<Ichat>("Chat", ChatSchema);

