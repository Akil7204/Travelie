import { commonAPI } from "./commonAPI";
import { server_URL_admin } from "./serverURL";

import axios from "axios";

// Login API
export const LoginAPI = async (reqBody: any) => {
  // return await commonAPI("POST", `${server_URL_admin}/login`, reqBody);
  const response = await axios.post(`${server_URL_admin}/login`, reqBody, {withCredentials: true});
  return response.data
};

// Get All Users API
export const getAllUnapprovalAPI = async (token: string) => {
  try {
    const response = await commonAPI('GET', `${server_URL_admin}/approval`, undefined, {
      Authorization: `Bearer ${token}`,
    });
    console.log(response);
    
    return response 
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

// approval API
export const approvalAPI = async (companyId: string, token: string) => {
  return await axios.put(`${server_URL_admin}/approval/${companyId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllUsersAPI = async (token: string) => {
  try {
    const response = await commonAPI(
      "GET",
      `${server_URL_admin}/getAllUsers`,
      undefined,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(response);

    return response;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};


