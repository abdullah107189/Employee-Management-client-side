import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPubilc";

const useCheckRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosPublic();
  const {
    data: checkRole = "",
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["checkRole", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/checkRole/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });
  return { checkRole, isLoading, refetch };
};

export default useCheckRole;
