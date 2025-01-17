import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetUserData = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/allUser");
      return data;
    },
  });
  return { allUsers, isLoading, refetch };
};

export default useGetUserData;
