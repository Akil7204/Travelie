import mongoose, { Schema, Document } from "mongoose";
import { Admin } from "../domain/admin";
import { Company, CompanyModel } from "../domain/company";
import { User, UserModel } from "../domain/user";
import { IReport, ReportModel } from "../domain/ReportModel";
import { bookedModal } from "../domain/bookedTrip";

// Define the Mongoose schema for the User
const AdminSchema: Schema<Admin> = new Schema({
  adminName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the Mongoose model
export const AdminModel = mongoose.model<Admin>("Admin", AdminSchema);

export const findUserByEmailAdmin = async (
  email: string
): Promise<Admin | null> => {
  const admin = await AdminModel.findOne({ email });
  return admin ? admin : null;
};

export const getAllUnapprovalFromDB = async () => {
  return await CompanyModel.find({ adminVerified: false }).sort({
    createdAt: -1,
  });
};

export const updateCompanyFromDB = async (id: string) => {
  return await CompanyModel.findOneAndUpdate(
    { _id: id }, 
    { $set: { adminVerified: true } }, 
    {
      returnOriginal: false, 
      upsert: false, 
    }
  );
};

// Fetch all users
export const findAllUsers = async (): Promise<User[]> => {
  return UserModel.find(); 
};

// Function to block a user by ID
export const blockUserById = async (userId: string) => {
  return UserModel.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
};

// Function to unblock a user by ID
export const unblockUserById = async (userId: string) => {
  return UserModel.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
};

export const getAllCompaniesFromDB = async () => {
  return CompanyModel.find().sort({ createdAt: -1 })
};

export const blockCompanyById = async (companyId: string) => {
  return CompanyModel.findByIdAndUpdate(companyId, { isBlocked: true }, { new: true });
};

export const unblockCompanyById = async (companyId: string) => {
  return CompanyModel.findByIdAndUpdate(companyId, { isBlocked: false }, { new: true });
};

// Create a new report
export const createReport = async (
  companyId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  userMessage: string
): Promise<IReport> => {
  const newReport = new ReportModel({ companyId, userId, userMessage });
  return await newReport.save();
};

// Get all reports
export const getAllReports = async (): Promise<IReport[]> => {
  return await ReportModel.find().populate("companyId").populate("userId").exec();
};

// Update report status
export const updateReportStatus = async (
  reportId: mongoose.Types.ObjectId,
  status: "Pending" | "Resolved" | "Dismissed"
): Promise<IReport | null> => {
  return await ReportModel.findByIdAndUpdate(
    reportId,
    { status },
    { new: true }
  );
};


export const getTotalTrips = async () => {
  try {
    return await bookedModal.countDocuments({paymentStatus: "success"});
  } catch (error: any) {
    console.error("Error getting total trips", error);
    throw error;
  }
};

export const getTotalRevenue = async () => {
  try {
    const result = await bookedModal.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);
    return result[0]?.totalRevenue || 0;
  } catch (error: any) {
    console.error("Error getting total revenue", error);
    throw error;
  }
};

export const getTotalCompanies = async () => {
  try {
    return await CompanyModel.countDocuments({});
  } catch (error: any) {
    console.error("Error getting total companies", error);
    throw error;
  }
};

export const getTotalUsers = async () => {
  try {
    return await UserModel.countDocuments({});
  } catch (error: any) {
    console.error("Error getting total users", error);
    throw error;
  }
};

export const getReportStats = async () => {
  try {
    const pendingCount = await ReportModel.countDocuments({ status: "Pending" });
    const resolvedCount = await ReportModel.countDocuments({ status: "Resolved" });
    const dismissedCount = await ReportModel.countDocuments({ status: "Dismissed" });

    return {
      pending: pendingCount,
      resolved: resolvedCount,
      dismissed: dismissedCount,
    };
  } catch (error) {
    console.error("Error fetching report stats", error);
    throw error;
  }
};

export const getRevenueLastTwoWeeks = async () => {
  try {
    const today = new Date();
    const twoWeeksAgo = new Date(today);
    twoWeeksAgo.setDate(today.getDate() - 14);

    const revenueData = await bookedModal.aggregate([
      {
        $match: {
          paymentStatus: "success", 
          createdAt: { $gte: twoWeeksAgo, $lte: today },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    console.log(revenueData);
    

    return revenueData; 
  } catch (error) {
    console.error("Error fetching revenue data", error);
    throw error;
  }
};