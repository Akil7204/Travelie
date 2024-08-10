import { Request, Response } from "express";
import { otpGenerator } from "../../uilts/otpGenerator";
import { registerUser } from "../../application/userService";
import { findUserByEmail } from "../../Infrastructure/userRepository";
import { sendEmail } from "../../uilts/sendEmail";

// register the user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, phone, password } = req.body;
    console.log(username, email, phone, password);

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
