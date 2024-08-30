import mongoose, { Document, Schema } from 'mongoose';
import { User } from './user';
import {Company} from './company'


interface Trip extends Document {
    tripName: string,
    description: string,
    images: string[],
    days: number,
    startingFrom: string,
    endingAt: string,
    startingDate: Date,
    endingDate: Date,
    price: number,
    locations: string[],
    status: string,
    companyId: mongoose.Schema.Types.ObjectId,
    category: string,
    totalSeats: number,
    bookedSeats?: number,
}

const tripSchema = new Schema<Trip>({
    tripName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    days: {
        type: Number,
        required: true,
    },
    startingFrom: {
        type: String,
        required: true,
    },
    endingAt: {
        type: String,
        required: true,
    },
    startingDate: {
        type: Date,
        required: true,
    },
    endingDate: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    locations: {
        type: [String],
        required: true,
    },
    status: {
        type: String,
        default: "Upcoming",
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company", // it is reference of company
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    totalSeats: {
        type: Number,
        required: true,
    },
    bookedSeats: {
        type: Number,
    }
}, {timestamps: true});


export const Trips = mongoose.model<Trip>("Trips", tripSchema);
export type {Trip};