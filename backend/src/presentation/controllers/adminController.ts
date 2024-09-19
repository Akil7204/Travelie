import { Request, Response, NextFunction } from "express";
import {
  blockUser,
  getAllUnapprovalCompany,
  getAllUsers,
  loginUser,
  unblockUser,
  updateApproval,
} from "../../application/adminService";

export const adminlogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const result = await loginUser(email, password);
    console.log(result);

    if (result) {
      res.cookie("adminToken", result.adminToken);
      res.json({ adminToken: result.adminToken, admin: result.admin });
    } else {
      res.status(401).json({ message: "Login failed" });
    }
  } catch (error) {
    next(error);
  }
};

// Get all un approval company
export const getCompanyUnapproval = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const unApproval = await getAllUnapprovalCompany();
    res.status(200).json(unApproval);
  } catch (error) {
    next(error);
  }
};

export const updateCompanyApproval = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updateCompany = await updateApproval(id);

    res.status(200).json(updateCompany);
  } catch (error: any) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getUsersList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Block a user
export const blockUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    console.log("backend", userId);
    
    const blockedUser = await blockUser(userId);
    res.status(200).json({ message: "User blocked successfully", user: blockedUser });
  } catch (error) {
    next(error);
  }
};

// Unblock a user
export const unblockUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const unblockedUser = await unblockUser(userId);
    res.status(200).json({ message: "User unblocked successfully", user: unblockedUser });
  } catch (error) {
    next(error);
  }
};
