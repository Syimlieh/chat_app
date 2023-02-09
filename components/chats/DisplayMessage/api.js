import { axiosApi } from "@/utils/api";
import axios from "axios";

export const getMessages = async (inboxId) => {
  try {
    const res = await axiosApi.get(`/message/${inboxId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const sendMessage = async ({ messageText, user, receiverId }) => {
  try {
    const res = await axiosApi.post(`/conversation`, {
      messageText,
      senderId: user.data._id,
      receiverId,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const sendingMessage = async ({ messageText, user, receiverId }) => {
  try {
    const res = await axiosApi.post(`/conversation`, {
      senderId: user?.data._id,
      receiverId,
      messageText: messageText,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
