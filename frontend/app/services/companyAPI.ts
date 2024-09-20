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
  return await commonAPI(
    "POST",
    `${SERVER_URL_COMPANY}/signup`,
    reqBody,
    reqHeader
  );
};

// Login API
export const LoginAPI = async (reqBody: any) => {
  // return await commonAPI("POST", `${SERVER_URL_COMPANY}/login`, reqBody);
  const response = await axios.post(`${SERVER_URL_COMPANY}/login`, reqBody, {
    withCredentials: true,
  });
  return response.data;
};

// verfy otp Api
export const verifyOtp = async (data: any) => {
  console.log("comming: " + data);

  return api.post("/verifyOtp", data);
};

export const addTripAPI = async (data: any) => {
  return await axios.post(`${SERVER_URL_COMPANY}/addTrip`, data, {
    withCredentials: true,
  });
};

export const getAllTripsAPI = async (page: number, tripsPerPage: number) => {
  try {
    const response = await axios.get(`${SERVER_URL_COMPANY}/trips`, {
      params: { page, limit: tripsPerPage },
      withCredentials: true,
    });

    return response.data; // Make sure this returns both `trips` and `totalCount` from your backend
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw error; // Throw the error to be handled in the calling function
  }
};

export const getTripByIdAPI = async (tripId: string) => {
  try {
    const response = await axios.get(
      `${SERVER_URL_COMPANY}/editTrip/${tripId}`,
      { withCredentials: true }
    );
    return response.data; // Axios automatically parses the JSON response
  } catch (error) {
    console.error("Failed to fetch trip data:", error);
    throw error;
  }
};

export const addCategoryAPI = async (data: any) => {
  return await axios.post(`${SERVER_URL_COMPANY}/addCategory`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data", // Ensure that the content type is set to multipart/form-data
    },
  });
};

export const getAllCategoryAPI = async (page: number, categoyPerPage: number) => {
  try {
    const response = await axios.get(`${SERVER_URL_COMPANY}/categorys`, {
      params: { page, limit: categoyPerPage },
      withCredentials: true,
    });

    return response.data; // Make sure this returns both `trips` and `totalCount` from your backend
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error; // Throw the error to be handled in the calling function
  }
};

export const getCategoryByIdAPI = async (categoryId: string) => {
  try {
    const response = await axios.get(
      `${SERVER_URL_COMPANY}/editCategory/${categoryId}`,
      { withCredentials: true }
    );
    return response.data; // Axios automatically parses the JSON response
  } catch (error) {
    console.error("Failed to fetch trip data:", error);
    throw error;
  }
};


export const editTripApi = async (data: any, tripId: string) => {
  return await axios.post(`${SERVER_URL_COMPANY}/editTrip/${tripId}`, data, {
    withCredentials: true,
  });
};

export const editCategoryApi = async (data: any, categoryId: string) => {
  return await axios.post(`${SERVER_URL_COMPANY}/editCategory/${categoryId}`, data, {
    withCredentials: true,
  });
};

export const softDeleteCategoryAPI = async (categoryId: string) => {
  const response = await axios.put(`${SERVER_URL_COMPANY}/category/softDelete/${categoryId}`, null, { withCredentials: true });
  return response.data;
};

