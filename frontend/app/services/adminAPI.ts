import { commonAPI } from "./commonAPI";
import { server_URL_admin } from "./serverURL";

import axios from "axios";

// Login API
export const LoginAPI = async (reqBody: any) => {
  // return await commonAPI("POST", `${server_URL_admin}/login`, reqBody);
  const response = await axios.post(`${server_URL_admin}/login`, reqBody, {withCredentials: true});
  return response.data
};

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


export const unblockUserAPI = async (userId: string, token: string) => {
  return await axios.put(
    `${server_URL_admin}/unblockUser/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const blockUserAPI = async (userId: any, token: string) => {
  return await axios.put(
    `${server_URL_admin}/blockUser/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const getAllCompanyAPI = async (token: string) => {
  try {
    const response = await commonAPI(
      "GET",
      `${server_URL_admin}/getAllCompanies`,
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

export const unblockCompanyAPI = async (userId: string, token: string) => {
  return await axios.put(
    `${server_URL_admin}/company/unblockUser/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const blockCompanyAPI = async (userId: any, token: string) => {
  return await axios.put(
    `${server_URL_admin}/company/blockUser/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllReportsAPI = async (token: string) => {
  try {
    const response = await axios.get(`${server_URL_admin}/reports`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to fetch reports");
  }
};



export const updateReportStatusAPI = async (reportId: string, status: "Pending" | "Resolved" | "Dismissed", token: string) => {
  try {
    const response = await axios.put(
      `${server_URL_admin}/report/${reportId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update report status");
  }
};


export const fetchingAllData = async (token: string) => {
  const response = await axios.get(`${server_URL_admin}/dashboard`, {headers: {
    Authorization: `Bearer ${token}`,
  }, });
  return response.data;
};