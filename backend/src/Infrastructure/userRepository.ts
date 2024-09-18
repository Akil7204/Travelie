import  {  Document } from "mongoose";
import { User, UserModel } from "../domain/user";
import { Trip, Trips } from "../domain/trips";
import { bookedModal } from "../domain/bookedTrip";
// Extending the User interface with mongoose Document
interface UserModel extends User, Document {
  otp?: string;
  otpVerified?: boolean;
}

// Define the Mongoose schema for the User

// Function to create a new user
export const createUser = async (user: User) => {
  const newUser = new UserModel(user);
  return newUser.save();
};

// Function to find a user by email
export const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};

// Function to update a user by email
export const updateUser = async (email: string, update: Partial<User>) => {
  return UserModel.findOneAndUpdate({ email }, update, { new: true });
};

// Function to find a user by email and password
export const findUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  return UserModel.findOne({ email, password });
};

// Function to update the user's profile by user ID
export const updateUserProfile = async (
  userId: string,
  update: Partial<User>
) => {
  return UserModel.findByIdAndUpdate(userId, update, { new: true });
};

export const allTripsFromDB = async () => {
  return await Trips.find()
    .sort({
      createdAt: -1,
    })
    .populate("companyId");
};

// Function to find a user by ID
export const findUserById = async (userId: string) => {
  return UserModel.findById(userId);
};

export const getDetailTrip = async (id: string): Promise<Trip | null> => {
  return await Trips.findById(id).populate("companyId");
};

export const createBookingformDB = async (
  tripId: string,
  seatCount: number,
  totalAmount: number,
  userId: string
) => {
  try {
    // Create a new booking document
    const bookedTrip = new bookedModal({
      tripId: tripId,
      userId: userId,
      seats: seatCount,
      totalAmount: totalAmount,
    });

    // Save the new booking in the database
    const bookedTripSaved = await bookedTrip.save();
    // console.log("Booking ID: ", bookedTripSaved._id);

   

    // console.log("Updated Trip: ", updatedTrip);

    return bookedTripSaved._id;
  } catch (error) {
    console.error("Error saving bookedTrip: ", error);
    throw error;
  }
};

export const getBookingDetail = async (id: string) => {
  try {
    // Fetch booking details by ID and populate 'tripId' and 'userId'
    const bookedData = await bookedModal
      .findById(id)
      .populate("tripId") // Populate trip details
      .populate("userId"); // Populate user details

    if (!bookedData) {
      throw new Error(`Booking with id ${id} not found`);
    }
    // console.log(bookedData); // Log the fetched booking details
    return bookedData; // Return the booking data
  } catch (error) {
    console.error("Error fetching booking details:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const updateBookedTrip = async (
  productinfo: string,
  txnid: string,
  status: string,
) => {
  try {
    
    const bookedData = await bookedModal.findByIdAndUpdate(
      productinfo, // The ID of the document to update
      { txnId: txnid, paymentStatus: status }, // The fields to update
      { new: true } // Return the updated document
    );
     // // Find the trip by tripId and increment the bookedSeat field by seatCount
    // const updatedTrip = await Trips.findByIdAndUpdate(
    //   tripId,
    //   { $inc: { bookedSeats: seatCount } }, // Increment the bookedSeat field by seatCount
    //   { new: true } // Return the updated document
    // );
    // console.log({bookedData});

    
    return bookedData
  } catch (error) {
    console.log(error);
    
  }
};
