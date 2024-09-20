import { NextFunction, Request, Response } from "express";
import { otpGenerator } from "../../uilts/otpGenerator";
import {
  addTransactionDetails,
  allTrips,
  fetchbookingData,
  fetchbookingSeat,
  fetchDetailTrip,
  findBookingTrip,
  getBookingsByUser,
  googleLogin,
  loginUser,
  registerUser,
  updateUserProfileSER,
  verifyAndSaveUser,
} from "../../application/userService";
import {
  findUserByEmail,
  findUserById,
} from "../../Infrastructure/userRepository";
import { sendEmail } from "../../uilts/sendEmail";
import { profileAddBucket } from "../../uilts/profileAddBucket";
import { chatModel } from "../../domain/chatModel";
var jsSHA = require("jssha");

// register the user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, phone, password } = req.body;

    // Define the proceedWithRegistration function
    const proceedWithRegistration = async () => {
      try {
        const otp = otpGenerator();
        console.log(otp);

        await registerUser({
          username,
          phone,
          email,
          password,
          otp,
        });

        await sendEmail(email, otp);

        res.status(200).json("OTP sent to email");
      } catch (error: any) {
        res
          .status(400)
          .json({ error: "Registration failed: " + error.message });
      }
    };
    proceedWithRegistration();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    console.log(email, otp);

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user.otp, otp);

    if (user.otp === otp) {
      await verifyAndSaveUser(email, otp);
      res.status(200).json("User registered successfully");
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error: any) {
    console.log(error.message);

    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    // console.log({user, token});

    res.cookie("token", token);
    // console.log('Cookie set:', req.cookies['token']);
    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const googleLoginHandler = async (req: Request, res: Response) => {
  try {
    const { email, username, profileImage, phone } = req.body;
    console.log("from req.body: " + email, username, phone);

    googleLogin({
      email,
      username,
      phone,
    })
      .then((loginResult) => {
        res.cookie("token", loginResult.token);
        res.status(200).json(loginResult);
      })
      .catch((error: any) => {
        res.status(500).json({ error: "Failed to handle Google login" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process Google login" });
  }
};

export const getAllTrips = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const AllTrips = await allTrips();

    res.status(200).json(AllTrips);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { username, email, password, phone } = req.body;
    const profileImage = req.file;
    // console.log({ userId });
    // console.log(req.body);
    // console.log(profileImage);
    let imageUrl: any;
    if (profileImage) {
      imageUrl = await profileAddBucket(profileImage);
    }
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const proceedWithUpdate = async (image?: any) => {
      try {
        const updateData: any = {
          username,
          email,
        };
        if (imageUrl) {
          updateData.profileImage = imageUrl;
        }

        const updatedUser = await updateUserProfileSER(userId, updateData);

        res.status(200).json(updatedUser);
      } catch (error: any) {
        res
          .status(400)
          .json({ error: "Failed to update profile: " + error.message });
      }
    };

    proceedWithUpdate(imageUrl);
  } catch (error: any) {
    console.log({ error });
    next(error);
    res.status(400).json({ error: error.message });
  }
};

export const detailTrip = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tripId = req.params.id;
    const trip = await fetchDetailTrip(tripId);
    res.status(200).json(trip);
  } catch (error: any) {
    console.error("Error fetching trip:", error);
    res.status(404).json({ message: error.message });
  }
};

export const bookingSeat = async (req: any, res: Response) => {
  try {
    // console.log(req.body);
    const { tripId, seatCount } = req.body;
    const userId = req.userId;
    const bookedSeatId = await fetchbookingSeat(tripId, seatCount, userId);
    res.status(200).json({ bookedSeatId });
  } catch (error) {}
};

export const fetchBookedData = async (req: Request, res: Response) => {
  const bookingId = req.params.id; // Get bookingId from request params
  try {
    // console.log(`Fetching booking with ID: ${bookingId}`);

    const booking: any = await findBookingTrip(bookingId); // Fetch booking from DB

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" }); // Handle no booking found case
    }

    // console.log("Booking found:", booking);
    res.status(200).json(booking); // Send booking data back to the client
  } catch (error) {
    console.error("Error fetching booking data:", error);
    res.status(500).json({ message: "Internal server error" }); // Send error response
  }
};

// payment controllers

export const payment = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);

    const { txnid, amount, productinfo, username, email } = req.body;
    console.log({ txnid, amount, productinfo, username, email });

    if (!txnid || !amount || !productinfo || !username || !email) {
      res.status(400).send("Mandatory fields missing");
      return;
    }

    // console.log({ process.env.PAYU_MERCHANT_KEY, PAYU_SALT, txnid });

    const hashString = `${process.env.PAYU_MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${username}|${email}|||||||||||${process.env.PAYU_SALT}`;

    const sha = new jsSHA("SHA-512", "TEXT");
    sha.update(hashString);
    const hash = sha.getHash("HEX");

    res.send({ hash: hash });
  } catch (error) {
    console.log("error payment:", error);
    res.status(500).send("Internal server error");
  }
};

export const addTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { PayUOrderId, email, status } = req.body;
    console.log({ PayUOrderId, email, status });

    const transactionId = await addTransactionDetails(
      email,
      PayUOrderId,
      status
    );

    res.status(200).send(transactionId);
  } catch (error) {
    next(error);
  }
};

export const saveData = async (req: Request, res: Response) => {
  try {
    console.log("all data: ", req.body);
    const { txnid, email, productinfo, status } = req.body;
    console.log({ txnid, email, productinfo, status });
    if (status == "success") {
      const bookedTripId = await fetchbookingData(txnid, productinfo, status);
      // console.log({bookedTripId});
      const { tripId, userId }: any = bookedTripId;
      const trip = await fetchDetailTrip(tripId);
      const companyId = trip?.companyId;
      let chat = await chatModel.findOne({ userId, companyId });
      if (!chat) {
        // If no chat exists, create a new chat
        chat = new chatModel({
          userId,
          companyId,
        });
        await chat.save();
      }
      res.status(200).json(bookedTripId?._id);
    } else if (status == "failure") {
      console.log(status);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserBookings = async (req: any, res: Response) => {
  const userId = req.userId;
  console.log(userId);

  try {
    const bookings = await getBookingsByUser(userId);
    console.log(bookings);

    res.status(200).json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
