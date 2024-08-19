import { Request, Response, NextFunction } from "express";
import {
  getAllUnapprovalCompany,
  loginUser,
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
