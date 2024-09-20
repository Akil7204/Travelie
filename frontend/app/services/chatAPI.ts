import axios from "axios";
import { SERVER_URL_CHAT, SERVER_URL_MESSAGE } from "./serverURL";

export const userChats = (id: string) => {
  return axios.get(`${SERVER_URL_CHAT}/${id}`);
};

export const sendMessage = async (
  chatId: string,
  senderId: string,
  text: string,
  senderModel: string
) => {
  try {
    console.log(chatId, senderId, text);

    const response = await axios.post(`${SERVER_URL_MESSAGE}/message`, {
      chatId,
      senderId,
      text,
      senderModel,
    });
    console.log(response)

    // Return the response data from the API
    return response.data;
  } catch (error: any) {
    console.error("Error while sending message:", error);
    throw new Error(error.response?.data?.message || "Failed to send message");
  }
};

export const getMessages = (id: string) => {
  try {
    return axios.get(`${SERVER_URL_MESSAGE}/message/${id}`);
  } catch (error: any) {
    console.log(error);
  }
};

// company API;

export const companyChats = (id: string) => {
  return axios.get(`${SERVER_URL_CHAT}/company/${id}`);
};

export const messageSend = async (
  messageData: any
) => {
  try {
    console.log({messageData});

    const response = await axios.post(`${SERVER_URL_MESSAGE}/company/message`, {
      messageData
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to send message");
  }
};
