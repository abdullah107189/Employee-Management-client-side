import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPubilc";
import useAuth from "./useAuth";

const useCheckRole = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    data: checkRole = "",
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["checkRole", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/checkRole/${user?.email}`);
      return data;
    },
  });
  return { checkRole, isLoading, refetch };
};

export default useCheckRole;
