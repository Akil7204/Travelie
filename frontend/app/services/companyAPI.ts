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
  // return await commonAPI("POST", `${SERVER_URL_COMPANY}/login`, reqBody);
  const response = await axios.post(`${SERVER_URL_COMPANY}/login`, reqBody, {withCredentials: true});
  return response.data
};

// verfy otp Api
export const verifyOtp = async (data: any) => {
  console.log("comming: " + data);
  
  return api.post("/verifyOtp", data);
};


export const addTripAPI = async (data: any) => {
  return await axios.post(`${SERVER_URL_COMPANY}/addTrip`, data, {withCredentials: true});
}

export const getAllTripsAPI = async () => {
  const response =  await axios.get(`${SERVER_URL_COMPANY}/trips`, {withCredentials: true});
  return response.data;
}