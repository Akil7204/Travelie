import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverURL";

import axios from "axios";

const api = axios.create({
  baseURL: `${SERVER_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// SignUp API
export const SignUpAPI = async (
  reqBody: any,
  reqHeader: { "Content-Type": string } | undefined
) => {
  return await commonAPI("POST", `${SERVER_URL}/signup`, reqBody, reqHeader);
};

// Login API
export const LoginAPI = async (reqBody: any) => {
  // return await commonAPI("POST", `${SERVER_URL}/login`, reqBody, { credentials: 'include' });
  const response = await axios.post(`${SERVER_URL}/login`, reqBody, {
    withCredentials: true,
  });
  return response.data;
};

// verfy otp Api
export const verifyOtp = async (data: any) => {
  return api.post("/verifyOtp", data);
};

// Google Api
export const GoogleLoginAPI = async (reqBody: any) => {
  // console.log(reqBody);

  // return await commonAPI("POST", `${SERVER_URL}/googleLogin`, reqBody);
  const response = await axios.post(`${SERVER_URL}/googleLogin`, reqBody, {
    withCredentials: true,
  });
  return response.data;
};

// Update User Profile
export const updateUserProfileAPI = async (reqBody: any) => {
  return await axios.put(`${SERVER_URL}/profile`, reqBody, {
    withCredentials: true,
  });
};

// get All Trip
export const allTripsAPI = async () => {
  const response = await axios.get(`${SERVER_URL}/trips`);
  return response.data;
};

export const detailTripsAPI = async (id: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}/trips/${id}`);
    return response.data; // Axios automatically parses the JSON response
  } catch (error) {
    console.error("Failed to fetch trip data:", error);
    throw error;
  }
};

export const bookingApi = async (reqBody: FormData, reqHeader: any) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/bookingSeat`, 
      reqBody,
      {
        headers: reqHeader,
        withCredentials: true,
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error in booking API:", error);
    throw error; // Optionally rethrow the error for further handling
  }
};
