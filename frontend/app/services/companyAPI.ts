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

export const getAllTripsAPI = async (page: number, tripsPerPage: number) => {
  try {
    const response = await axios.get(`${SERVER_URL_COMPANY}/trips`, {
      params: { page, limit: tripsPerPage },
      withCredentials: true
    });
    
    return response.data; // Make sure this returns both `trips` and `totalCount` from your backend
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error; // Throw the error to be handled in the calling function
  }
};

export const getTripByIdAPI = async (tripId: string) => {
  try {
    const response = await axios.get(`${SERVER_URL_COMPANY}/editTrip/${tripId}`, {withCredentials: true});
    return response.data; // Axios automatically parses the JSON response
  } catch (error) {
    console.error('Failed to fetch trip data:', error);
    throw error;
  }
};