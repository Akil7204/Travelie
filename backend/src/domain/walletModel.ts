import mongoose, { Document, Schema } from "mongoose";

interface Wallet extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  balance: number;
  transactions: Array<{
    type: "credit" | "debit";
    amount: number;
    date: Date;
    description: string;
  }>;
}

const walletSchema = new Schema<Wallet>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      type: {
        type: String,
        enum: ["credit", "debit"],
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      description: {
        type: String,
      },
    },
  ],
});

export const WalletModel = mongoose.model<Wallet>("Wallet", walletSchema);
