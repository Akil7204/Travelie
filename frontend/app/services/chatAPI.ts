import axios from "axios";
import { SERVER_URL_CHAT } from "./serverURL";

export const userChats = (id: string) => {
    return axios.get(`${SERVER_URL_CHAT}/${id}`);
}