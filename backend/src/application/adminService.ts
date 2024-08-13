import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmailAdmin } from "../Infrastructure/adminRepository";
import { Admin } from "../domain/admin";
import { errorHandler } from "../uilts/errorHandler"; // Assuming errorHandler is a utility function

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; admin: string } | null> => {
  //   const validAdmin = await findUserByEmailAdmin(email);
  //   if (!validAdmin) {
  //     throw errorHandler(404, 'User not found');
  //   }

  //   const validPassword = bcrypt.compareSync(password, validAdmin.password);
  //   if (!validPassword) {
  //     throw errorHandler(401, 'Wrong credentials');
  //   }

  if (process.env.Admin_email !== email) {
    throw errorHandler(404, "User not found");
  }
  if(process.env.Admin_pass !== password){
    throw errorHandler(401, 'Wrong credentials');
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
