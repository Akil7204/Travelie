import { NextFunction, Request, Response } from "express";
import { otpGenerator } from "../../uilts/otpGenerator";
import {
  allTrips,
  googleLogin,
  loginUser,
  registerUser,
  verifyAndSaveUser,
} from "../../application/userService";
import { findUserByEmail } from "../../Infrastructure/userRepository";
import { sendEmail } from "../../uilts/sendEmail";

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

export const updateProfile = async (req: any, res: Response) => {
  try {
    const userId = req.userId;
    const { username, email, password, phone } = req.body;
    const profileImage = req.file ? req.file.buffer : null;
    console.log({userId});
    console.log(req.body);
    console.log(req.files);
    
    
    

  } catch (error: any) {
    console.log({ error });
    res.status(400).json({ error: error.message });
  }
};
