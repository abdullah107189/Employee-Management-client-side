import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetReceiveMassage = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: receiveMassage,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["receiveMassage"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/contact-us");
      return data;
    },
  });
  return { receiveMassage, isLoading, refetch };
};

export default useGetReceiveMassage;
