import { NextFunction, Request, Response } from "express";
import { otpGenerator } from "../../uilts/otpGenerator";
import {
  fetchTripById,
  getAllTrips,
  getTotalCount,
  loginCompany,
  registerCompany,
  uploadImage,
  uploadTrip,
  verifyAndSaveCompany,
} from "../../application/companyService";
import { findCompanyByEmail } from "../../Infrastructure/companyRepository";
import { sendEmail } from "../../uilts/sendEmail";
import { IMulterFile } from "../../types/types";

interface CustomRequest extends Request {
  companyId?: string;
}

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
    if (company.adminVerified) {
      res.cookie("companyToken", companyToken);
      res.status(200).json({ company, companyToken });
    } else {
      res.status(200).json({ company });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const addTrip = async (req: any, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const companyId = req.companyId;

    const file = req.files as IMulterFile[];

    const imageUrl = await uploadImage(file);

    const tripData = await uploadTrip(companyId, body, imageUrl);
    if (tripData) {
      res.status(200).json("Trip Added successfully");
    } else {
      res.status(400).json({ error: "Trip not added :- somthing went worng" });
    }
  } catch (error) {
    console.log("error is: ", error);
  }
};

export const getTripsById = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const comapanyId = req.companyId;
    
    const allTrips = await getAllTrips(comapanyId, skip,  limit);
    const totalCount = await getTotalCount()
    
    res.status(200).json({allTrips, totalCount});
  } catch (error) {
    next(error);
  }
};

export const getTripById = async (req: Request, res: Response): Promise<void> => {
  try {
    const tripId = req.params.id;
    const trip = await fetchTripById(tripId);
    res.status(200).json(trip);
  } catch (error : any) {
    console.error('Error fetching trip:', error);
    res.status(404).json({ message: error.message });
  }
};
