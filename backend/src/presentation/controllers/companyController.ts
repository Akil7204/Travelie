import { NextFunction, Request, Response } from "express";
import { otpGenerator } from "../../uilts/otpGenerator";
import {
  fetchCategoryById,
  fetchTripById,
  getAllCategory,
  getAllTrips,
  getTotalCount,
  getTotalCountCategory,
  loginCompany,
  registerCompany,
  updateCategory,
  updateTrip,
  uploadCategory,
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

    const allTrips = await getAllTrips(comapanyId, skip, limit);
    const totalCount = await getTotalCount();

    res.status(200).json({ allTrips, totalCount });
  } catch (error) {
    next(error);
  }
};

export const getTripById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tripId = req.params.id;
    const trip = await fetchTripById(tripId);
    res.status(200).json(trip);
  } catch (error: any) {
    console.error("Error fetching trip:", error);
    res.status(404).json({ message: error.message });
  }
};

export const addCategory = async (req: any, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const companyId = req.companyId;

    const categoryData = await uploadCategory(companyId, body);
    if (categoryData) {
      res.status(200).json("Category Added successfully");
    } else {
      res
        .status(400)
        .json({ error: "Category not added :- somthing went worng" });
    }
  } catch (error) {
    console.log("error is: ", error);
  }
};

export const getCategorysById = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const comapanyId = req.companyId;

    const allCategory = await getAllCategory(comapanyId, skip, limit);
    const totalCount = await getTotalCountCategory();

    res.status(200).json({ allCategory, totalCount });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categoryId = req.params.id;
    const category = await fetchCategoryById(categoryId);
    res.status(200).json(category);
  } catch (error: any) {
    console.error("Error fetching trip:", error);
    res.status(404).json({ message: error.message });
  }
};

export const editTripById = async (req: any, res: Response): Promise<void> => {
  try {
    const tripId = req.params.id;
    const body = req.body;
    const companyId = req.companyId;

    // Check if files are uploaded
    const files = req.files as IMulterFile[];
    let imageUrl = [];
    
    // If files exist, upload the images
    if (files && files.length > 0) {
      imageUrl = await uploadImage(files); // Assuming this returns an array of image URLs
    }

    // Update the trip with the new data
    const updatedTripData = await updateTrip(companyId, body, imageUrl, tripId);

    // Send the updated trip as a response
    res.status(200).json({
      message: "Trip updated successfully",
      data: updatedTripData
    });
  } catch (error: any) {
    console.error("Error updating trip:", error);
    res.status(500).json({ message: "Failed to update trip", error: error.message });
  }
};


export const editCategoryById = async (req: any, res: Response): Promise<void> => {
  try {
    const categoryId = req.params.id;
    const body = req.body;
    const companyId = req.companyId;
    // Update the trip with the new data
    const updatedCategoryData = await updateCategory(companyId, body, categoryId);
    console.log( {updatedCategoryData});
    
    // Send the updated trip as a response
    res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategoryData
    });
  } catch (error: any) {
    console.error("Error updating Category:", error);
    res.status(500).json({ message: "Failed to update category", error: error.message });
  }
};
