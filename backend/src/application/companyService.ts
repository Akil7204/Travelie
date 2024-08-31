import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createCompany,
  CreatingTrip,
  findCompanyByEmail,
  updateCompany,
} from "../Infrastructure/companyRepository";
import { Company } from "../domain/company";
import { uploadToS3Bucket } from "../uilts/s3bucket";
import { Trip, Trips } from "../domain/trips";

// registerUser new Company
export const registerCompany = async (company: Company) => {
  try {
    const existingCompany = await findCompanyByEmail(company.email);
    // console.log(existingCompany);

    if (existingCompany) {
      if (existingCompany.otpVerified) {
        throw new Error("User already exists");
      } else {
        await updateCompany(existingCompany.email, company);
        return existingCompany;
      }
    }

    const hashedPassword = await bcrypt.hash(company.password, 10);
    company.password = hashedPassword;

    return await createCompany(company);
  } catch (error) {
    console.error("Error during user registration:", error);

    throw error;
  }
};

export const verifyAndSaveCompany = async (email: string, otp: string) => {
  const company = await findCompanyByEmail(email);
  if (company && company.otp === otp) {
    company.otp = undefined;
    company.otpVerified = true;
    await company.save();
    return company;
  }
  throw new Error("Invalid OTP");
};

// login the user
export const loginCompany = async (email: string, password: string) => {
  const company = await findCompanyByEmail(email);
  if (!company) {
    throw new Error("Invalid Email/Password");
  }
  const isPasswordValid = await bcrypt.compare(password, company.password);
  if (!isPasswordValid) {
    throw new Error("Invalid Email/Password");
  }
  const companyToken = jwt.sign(
    { companyId: company._id },
    process.env.JWT_SECRET_KEY!,
    {
      expiresIn: "1h",
    }
  );
  return { company, companyToken };
};

export const uploadImage = async (file: any): Promise<any> => {
  try {
    const result = await uploadToS3Bucket([file]);
    // console.log(result);

    return result;
    // return await postsRepository.uploadImage(imageFile);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const uploadTrip = async (
  companyId: string,
  data: Trip,
  images: string[]
) => {
  console.log("came");
  try {
    const TripData = { companyId, data, images };

    TripData.data.seats = Number(TripData?.data?.seats)
    const tripsadd = await CreatingTrip(TripData);
    // console.log(tripsadd);
    return tripsadd

  } catch (error) {}
};
