import mongoose, { Schema, Document } from "mongoose";
import { Company } from "../domain/company";
import { Trip, Trips } from "../domain/trips";

// Extending the Company interface with mongoose Document
interface CompanyModel extends Company, Document {
  otp?: string;
  otpVerified?: boolean;
}

// Define the Mongoose schema for the Company
const CompanySchema: Schema<CompanyModel> = new Schema({
  companyname: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  adminVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpVerified: { type: Boolean, default: false },
});

// Create the Mongoose model
export const CompanyModel = mongoose.model<CompanyModel>(
  "Company",
  CompanySchema
);

// Function to create a new user
export const createCompany = async (company: Company) => {
  const newCompany = new CompanyModel(company);
  return newCompany.save();
};

// Function to find a comapany by email
export const findCompanyByEmail = async (email: string) => {
  return CompanyModel.findOne({ email });
};

// Function to update a company by email
export const updateCompany = async (
  email: string,
  update: Partial<Company>
) => {
  return CompanyModel.findOneAndUpdate({ email }, update, { new: true });
};

// Function to find a company by email and password
export const findCompanyByEmailAndPassword = async (
  email: string,
  password: string
) => {
  return CompanyModel.findOne({ email, password });
};

export const CreatingTrip = async (TripData: any) => {
  try {
    // Convert stringified locations array to actual array
    TripData.data.locations = JSON.parse(TripData.data.locations);

    // Create a new trip instance
    const trip = new Trips({
      companyId: TripData.companyId,
      tripName: TripData.data.tripName,
      description: TripData.data.description,
      days: parseInt(TripData.data.days, 10),
      startingFrom: TripData.data.startingFrom,
      endingAt: TripData.data.endingAt,
      startingDate: new Date(TripData.data.startingDate),
      endingDate: new Date(TripData.data.endingDate),
      price: parseFloat(TripData.data.basePrice),
      locations: TripData.data.locations,
      category: TripData.data.category,
      seats: parseInt(TripData.data.seats, 10),
      status: TripData.data.status,
      images: TripData.images,
    });

    // Save the trip to the database
    const savedTrip = await trip.save();
    console.log("Saved Trip: ", savedTrip);

    return savedTrip;
    
  } catch (error) {
    console.error("Error saving trip: ", error);
    throw error;
  }
};

export const getAllTripsFromDB = async (comapanyId: string, skip: number, limit: number) => {

  return await Trips.find({companyId: comapanyId}).skip(skip).limit(limit).sort({
    createdAt: -1,
  });
};

export const getAllCountFromDb = async (): Promise<number> => {
  try {
    return await Trips.countDocuments(); // Count all documents in the Trip collection
  } catch (error) {
    console.error("Error fetching count from database:", error);
    throw error;
  }
};
