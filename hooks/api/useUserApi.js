import { axiosApi } from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";

const fetchProfileApi = (session) => {
  return axiosApi.post("/user", { email: session.user.email });
};

//update
const updateProfileApi = (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axiosApi.patch("/user/update", formData, config);
};

export const useUserFetchProfile = (session, onSuccess, onError) => {
  return useQuery(["fetchUser"], () => fetchProfileApi(session), {
    onSuccess,
    onError,
  });
};

export const useUpdateProfile = () => {
  return useMutation(updateProfileApi);
};
