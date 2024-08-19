import { Request, Response } from "express";
import { otpGenerator } from "../../uilts/otpGenerator";
import { loginCompany, registerCompany, verifyAndSaveCompany } from "../../application/companyService";
import { findCompanyByEmail } from "../../Infrastructure/companyRepository";
import { sendEmail } from "../../uilts/sendEmail";

// register the Company
export const register = async (req: Request, res: Response) => {
  try {
    const { companyname, email, phone, password } = req.body;

    // Define the proceedWithRegistration function
    const proceedWithRegistration = async () => {
      try {
        const otp = otpGenerator();
        console.log(otp);

        await registerCompany({
          companyname,
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

    const company = await findCompanyByEmail(email);
    console.log(company);

    if (!company) {
      return res.status(404).json({ error: "company not found" });
    }

    if (company.otp === otp) {
      await verifyAndSaveCompany(email, otp);
      res.status(200).json("company registered successfully");
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { company, companyToken } = await loginCompany(email, password);
    res.cookie("companyToken", companyToken);
    res.status(200).json({ company, companyToken });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
