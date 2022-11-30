import { axiosApi } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const fetchConversation = (id) => {
  return axiosApi.get(`/conversation/${id}`);
};

export const useFetchConversation = (id, onSuccess, onError) => {
  return useQuery(["fetchConversation"], () => fetchConversation(id), {
    onSuccess,
    onError,
  });
};
