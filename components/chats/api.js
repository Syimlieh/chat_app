import { axiosApi } from "@/utils/api";

export const getInbox = async (session) => {
  try {
    const res = await axiosApi.get(`/conversation/${session}`);
    return res.data;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

export const searchUsername = async (searchUser) => {
  try {
    const res = await axiosApi.get(`/user/${searchUser}`);
    return res.data;
  } catch (error) {
    console.log({ error });
    return error;
  }
};
