import { SERVER_URL } from "@/app/services/serverURL";
import axios from "axios";

const apiClient = axios.create({
  baseURL: `${SERVER_URL}/PayU`,
  withCredentials: true,
  timeout: 120000,
});

export const PayUUrl = {
  payment: `${SERVER_URL}/PayU/payment`,
  response: `${SERVER_URL}/PayU/response`,
  test: `${SERVER_URL}/PayU/response/test`,
};

export default {
  paymentReq: async function (data: any) {
    try {
      const reshash = await apiClient.post("/payment", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log({reshash})
      return reshash.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  response: async function (pd: any) {
    try {
      const response = await apiClient.post("/response", JSON.stringify(pd), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log({response})
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  saveData: async function (pd: any) {
    try {
      const response = await apiClient.post("/response/saveData", JSON.stringify(pd), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};