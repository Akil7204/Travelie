import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  allTripsFromDB,
  BookingsByUser,
  createBookingformDB,
  createUser,
  findUserByEmail,
  getAllCountBookingFromDb,
  getBookingDetail,
  getDetailTrip,
  updateBookedTrip,
  updateUser,
  updateUserProfile,
} from "../Infrastructure/userRepository";

import { User } from "../domain/user";
import { Trip } from "../domain/trips";

// registerUser new User
export const registerUser = async (user: User) => {
  try {
    const existingUser = await findUserByEmail(user.email);
    // console.log(existingUser);

    if (existingUser) {
      if (existingUser.otpVerified) {
        throw new Error("User already exists");
      } else {
        await updateUser(existingUser.email, user);
        return existingUser;
      }
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    return await createUser(user);
  } catch (error) {
    console.error("Error during user registration:", error);

    throw error;
  }
};

export const verifyAndSaveUser = async (email: string, otp: string) => {
  const user = await findUserByEmail(email);
  if (user && user.otp === otp) {
    user.otp = undefined;
    user.otpVerified = true;
    await user.save();
    return user;
  }
  throw new Error("Invalid OTP");
};

// login the user
export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid Email/Password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid Email/Password");
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1h",
  });

  // const secret: string | undefined = process.env.JWT_SECRET;
  // if (!secret) throw new Error("JWT Secret not found");
  // const data = { user, role: "travelie-user" };
  // const token = jwt.sign(data, secret, {
  //   expiresIn: "1h",
  // });
  return { user, token };
};

// Function to handle Google login
export const googleLogin = async ({
  email,
  profileImagePath,
  username,
  phone,
}: {
  email: string;
  profileImagePath?: string;
  username: string;
  phone?: number;
}) => {
  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: "1h" }
      );
      return { user: existingUser, token };
    } else {
      const newUser: User = {
        username,
        email,
        password: "defaultPassword",
        profileImage: profileImagePath || "",
        phone: phone || undefined,
        otpVerified: true,
      };

      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashedPassword;

      const createdUser = await createUser(newUser);
      const token = jwt.sign(
        { userId: createdUser._id },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: "1h" }
      );
      return { user: createdUser, token };
    }
  } catch (error) {
    console.error("Error during Google login:", error);
    throw new Error("Failed to handle Google login");
  }
};

export const allTrips = async () => {
  return await allTripsFromDB();
};

export const updateUserProfileSER = async (
  userId: string,
  update: Partial<User>
) => {
  try {
    console.log("userId:", userId);
    // console.log('update:', update);
    const updatedUser = await updateUserProfile(userId, update);
    console.log(updateUser);

    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile");
  }
};

export const fetchDetailTrip = async (tripId: string): Promise<Trip> => {
  const trip = await getDetailTrip(tripId);
  if (!trip) {
    throw new Error("Trip not found");
  }
  return trip;
};

export const fetchbookingSeat = async (tripId: string, seatCount: number, userId: string) => {
  const AllTripDetails = await getDetailTrip(tripId);
  // console.log(AllTripDetails?.price);
  let totalAmount;
  if (AllTripDetails) {
    totalAmount = seatCount * AllTripDetails?.price;
  }
  const createBooking = await createBookingformDB(tripId, seatCount, totalAmount?totalAmount:0, userId)
  return createBooking;
};


export const findBookingTrip = async (bookingId: string) => {
  const bookingDetails = await getBookingDetail(bookingId)
  return bookingDetails;
}


export const addTransactionDetails = async (
  email: string,
  PayUOrderId: string,
  status: "success" | "failed"
) => {
  try {
    // const PayUOrderData = await PayURepository.getPayUOrder(PayUOrderId);
    // if (!PayUOrderData) throw new Error("PayU Order Data not found");
    // console.log("Got order id");
    // console.log(PayUOrderData);

    // const userData = await userServices.getUserDataByEmail(email);
    // if (!userData) throw new Error("User Data not found.");
    // const userId = userData._id.toString();

    // const transaction = await adsRepository.addTransaction(
    //   userId,
    //   PayUOrderId,
    //   PayUOrderData.mihpayid,
    //   status,
    //   PayUOrderData.amount
    // );
    // console.log("Added transaction");
    // console.log(transaction);
    // if (!transaction) throw new Error("Transaction Data not found");

    // if (status === "success") {
    //   const postId = PayUOrderData?.productinfo;
    //   const WeNetAdsData = await adsRepository.createWenetAds(
    //     userId,
    //     postId,
    //     transaction._id.toString()
    //   );
    //   console.log("created WeNetAdsData");
    //   console.log(WeNetAdsData);

    //   const postData = await adsRepository.addAdDataToPost(postId);
    //   console.log("Added ad data to post ");
    //   console.log(postData);

    //   try {
    //     await adsRepository.sendPostAdDataToMQ(
    //       postData._id.toString(),
    //       postData.WeNetAds
    //     );
    //   } catch (error: any) {
    //     console.log(error.message);
    //   }
    // }
    // return transaction._id.toString();
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const fetchbookingData = async (txnid: string, productinfo: string, status: string) => {

  const bookedTrip = await updateBookedTrip(productinfo, txnid, status);
  // console.log(AllTripDetails?.price);
  return bookedTrip;
};

export const getBookingsByUser = async (userId: string, skip: number, limit: number,) => {
  return await BookingsByUser(userId, skip, limit);
};

export const getTotalCountBooking = async(userId: string) => {
  return await getAllCountBookingFromDb(userId);
}