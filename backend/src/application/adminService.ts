import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  blockCompanyById,
  blockUserById,
  findAllUsers,
  findUserByEmailAdmin,
  getAllCompaniesFromDB,
  getAllUnapprovalFromDB,
  unblockCompanyById,
  unblockUserById,
  updateCompanyFromDB,
} from "../Infrastructure/adminRepository";
import { Admin } from "../domain/admin";
import { errorHandler } from "../uilts/errorHandler"; // Assuming errorHandler is a utility function
import { User } from "../domain/user";
import { findUserById } from "../Infrastructure/userRepository";
import { Company } from "../domain/company";
import { findCompanyById } from "../Infrastructure/companyRepository";

export const loginUser = async (
  email: string,
  password: string
): Promise<{ adminToken: string; admin: string } | null> => {

  if (process.env.Admin_email !== email) {
    throw errorHandler(404, "User not found");
  }
  if (process.env.Admin_pass !== password) {
    throw errorHandler(401, "Wrong credentials");
  }

  const adminToken = jwt.sign(
    {
      AdminEmail: email,
    },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "1h" }
  );

  return { adminToken, admin: email };
};

// Fetch all Un approval company
export const getAllUnapprovalCompany = async () => {
  return await getAllUnapprovalFromDB();
};

export const updateApproval = async (id: string) => {
  return await updateCompanyFromDB(id);
}

// Fetch all users
export const getAllUsers = async (): Promise<User[]> => {
  return findAllUsers();
};

// Function to block a user
export const blockUser = async (userId: string): Promise<User | null> => {
  const user = await findUserById(userId);
  if (!user) {
    throw errorHandler(404, "User not found");
  }

  if (user.isBlocked) {
    throw errorHandler(400, "User is already blocked");
  }

  return blockUserById(userId);
};


// Function to unblock a user
export const unblockUser = async (userId: string): Promise<User | null> => {
  const user = await findUserById(userId);
  if (!user) {
    throw errorHandler(404, "User not found");
  }

  if (!user.isBlocked) {
    throw errorHandler(400, "User is not blocked");
  }

  return unblockUserById(userId);
};

// Function to Get all workers
export const getAllCompanies = async () => {
  return await getAllCompaniesFromDB();
};

export const blockCompany = async (companyId: string): Promise<Company | null> => {
  const company = await findCompanyById(companyId);
  if (!company) {
    throw errorHandler(404, "company not found");
  }

  if (company.isBlocked) {
    throw errorHandler(400, "company is already blocked");
  }

  return blockCompanyById(companyId);
};

export const unblockCompany = async (companyId: string): Promise<Company | null> => {
  const company = await findCompanyById(companyId);
  if (!company) {
    throw errorHandler(404, "company not found");
  }

  if (!company.isBlocked) {
    throw errorHandler(400, "company is not blocked");
  }

  return unblockCompanyById(companyId);
};
