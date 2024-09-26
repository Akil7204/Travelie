import mongoose, { Document, Schema } from 'mongoose';

interface Booking extends Document {
    tripId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    seats: number;
    totalAmount: number,
    paymentType?: string,
    paymentStatus?: string,
    txnId?: string,
    createdAt: Date;
}

const bookingSchema = new Schema<Booking>({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trips",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    seats: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        default: "online"
    },
    paymentStatus: {
        type: String,
        default: "pending"
    },
    txnId: {
        type: String,
        default: null
    },
},{ timestamps: true });

export const bookedModal = mongoose.model<Booking>("bookedTrip", bookingSchema);
