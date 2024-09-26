import { commonAPI } from "./commonAPI";
import { SERVER_URL, SERVER_URL_ISBLOCKED } from "./serverURL";

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
  } catch (error: any) {
    console.error("Error in booking API:", error);
    return error.response
  }
};

export const fetchBookedData = async (bookingId: string) => {
  try {
    const response = await axios.get(`${SERVER_URL}/bookedTrip/${bookingId}`, { withCredentials: true}); // Adjust the API endpoint
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching booking data:", error);
    throw error;
  }
};

export const fetchingBookingDetails = async (bookingId: any) => {
  try {
    const response = await axios.get(`${SERVER_URL}/bookedTrip/${bookingId}`, { withCredentials: true}); // Adjust the API endpoint
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching booking data:", error);
    throw error;
  }
};

export const getUserBookingsAPI = async (page: number, bookingPerPage: number) => {
  try {
    const response = await axios.get(`${SERVER_URL}/bookings`,  { params: { page, limit: bookingPerPage },withCredentials: true });
    // console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    throw error;
  }
};


export const isBlockedApi = async (data: any) => {
  return axios.get(`${SERVER_URL_ISBLOCKED}/isBlockedApi/${data}`,  {withCredentials: true});
};

export const cancelBooking = async (bookingId: any) => {
  try {
    const response = await axios.post(`${SERVER_URL}/cancel-trip/${bookingId}`,null, { withCredentials: true}); 
    return response
  } catch (error) {
    console.error("Error fetching booking data:", error);
    throw error;
  }
};

export const fetchingWallet = async (userId: string, page: number, tranctionPerPage: number) => {
  try {
    const response = await axios.get(`${SERVER_URL}/wallet/${userId}`, { params: {  page, limit: tranctionPerPage }, withCredentials: true}); 
    return response
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    throw error;
  }
};

export const submitReportAPI = async (reportData: any) => {
  try {
    const response = await axios.post(`${SERVER_URL}/report`, reportData, { withCredentials: true}); 
    return response
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
};

export const getUnreadMessagesCountAPI = async () => {
  const response = await axios.get(`${SERVER_URL}/unread-count`, {withCredentials: true });
  return response.data;
};
