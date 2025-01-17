import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCheckRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
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
