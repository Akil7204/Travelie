import { commonAPI } from "./commonAPI";
import { server_URL_admin } from "./serverURL";

import axios from "axios";

// Login API
export const LoginAPI = async (reqBody: any) => {
  return await commonAPI("POST", `${server_URL_admin}/login`, reqBody);
};


