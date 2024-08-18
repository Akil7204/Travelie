import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUserByEmailAdmin,
  getAllUnapprovalFromDB,
  updateCompanyFromDB,
} from "../Infrastructure/adminRepository";
import { Admin } from "../domain/admin";
import { errorHandler } from "../uilts/errorHandler"; // Assuming errorHandler is a utility function

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; admin: string } | null> => {

  if (process.env.Admin_email !== email) {
    throw errorHandler(404, "User not found");
  }
  if (process.env.Admin_pass !== password) {
    throw errorHandler(401, "Wrong credentials");
  }

  const token = jwt.sign(
    {
      AdminEmail: email,
    },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "1h" }
  );

  return { token, admin: email };
};

// Fetch all Un approval company
export const getAllUnapprovalCompany = async () => {
  return await getAllUnapprovalFromDB();
};

export const updateApproval = async (id: string) => {
  return await updateCompanyFromDB(id);
}

// export const updateWorkerStatus = async (
//   userId: string,
//   status: "approved" | "rejected"
// ) => {
//   try {
//     const worker = await Worker.findOne({ userId });
//     if (!worker) {
//       throw new Error("Worker not found");
//     }

//     const updatedWorker = await Worker.findOneAndUpdate(
//       { userId },
//       { status },
//       { new: true }
//     );

//     return updatedWorker;
//   } catch (error: any) {
//     console.error(`Failed to update worker status: ${error.message}`);
//     throw new Error(`Failed to update worker status: ${error.message}`);
//   }
// };
