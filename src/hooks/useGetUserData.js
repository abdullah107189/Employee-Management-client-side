import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPubilc";

const useGetUserData = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/allUser");
      return data;
    },
  });
  return { allUsers, isLoading, refetch };
};

export default useGetUserData;
