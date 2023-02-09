import { axiosApi } from "@/utils/api";

export const getUser = async (email, setUser) => {
  try {
    const res = await axiosApi.post(`/user`, {
      email: email,
    });
    setUser(res.data);
    return res.data;
  } catch (error) {
    return error;
  }
};
