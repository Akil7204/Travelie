import { commonAPI } from "./commonAPI";
import { SERVER_URL_COMPANY } from "./serverURL";

import axios from "axios";

const api = axios.create({
  baseURL: `${SERVER_URL_COMPANY}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// SignUp API
export const SignUpAPI = async (
  reqBody: any,
  reqHeader: { "Content-Type": string } | undefined
) => {
  return await commonAPI("POST", `${SERVER_URL_COMPANY}/signup`, reqBody, reqHeader);
};

// Login API
export const LoginAPI = async (reqBody: any) => {
  return await commonAPI("POST", `${SERVER_URL_COMPANY}/login`, reqBody);
};

// verfy otp Api
export const verifyOtp = async (data: any) => {
  return api.post("/verifyOtp", data);
};
