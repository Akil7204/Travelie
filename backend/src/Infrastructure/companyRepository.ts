import mongoose, { Schema, Document } from "mongoose";
import { Company } from "../domain/company";
import { Trip, Trips } from "../domain/trips";
import { Category } from "../domain/category";

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

export const getTripById = async (id: string): Promise<Trip | null> => {
  return await Trips.findById(id);
};



export const CreatingCategory = async (categoryData: any) => {
  try {
    // Create a new category instance
    const category = new Category({
      name: categoryData.data.categoryName,
      companyId: categoryData.companyId,
    });

    // Save the trip to the database
    const savedCategory = await category.save();

    return savedCategory;
    
  } catch (error) {
    console.error("Error saving category: ", error);
    throw error;
  }
};

export const getAllCategoryFromDB = async (comapanyId: string, skip: number, limit: number) => {

  return await Category.find({companyId: comapanyId}).skip(skip).limit(limit).sort({
    createdAt: -1,
  });
};

export const getAllCountCategoryFromDb = async (): Promise<number> => {
  try {
    return await Category.countDocuments(); // Count all documents in the Trip collection
  } catch (error) {
    console.error("Error fetching count from database:", error);
    throw error;
  }
};

export const getCategoryById = async (id: string): Promise<Trip | null> => {
  return await Category.findById(id);
};

export const updateingTrip = async (companyId: string, body: any, imageUrl: string[], tripId: string) => {
  try {
    // Find the existing trip
    const trip = await Trips.findOne({ _id: tripId, companyId });
    
    if (!trip) {
      throw new Error('Trip not found or you are not authorized to edit this trip');
    }

    // Update fields
    trip.tripName = body.tripName || trip.tripName;
    trip.description = body.description || trip.description;
    trip.days = body.days || trip.days;
    trip.startingFrom = body.startingFrom || trip.startingFrom;
    trip.endingAt = body.endingAt || trip.endingAt;
    trip.startingDate = body.startingDate ? new Date(body.startingDate) : trip.startingDate;
    trip.endingDate = body.endingDate ? new Date(body.endingDate) : trip.endingDate;
    trip.price = body.price || trip.price;
    trip.locations = body.locations || trip.locations;
    trip.category = body.category || trip.category;
    trip.seats = body.seats || trip.seats;
    trip.status = body.status || trip.status;

    // Update images if new ones are provided
    if (imageUrl && imageUrl.length > 0) {
      trip.images = imageUrl;
    }

    // Save the updated trip
    const updatedTrip = await trip.save();

    return updatedTrip;
  } catch (error: any) {
    console.error("Error updating trip:", error);
    throw new Error(error.message);
  }
};


