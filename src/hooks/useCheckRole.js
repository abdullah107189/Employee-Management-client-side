import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCheckRole = () => {
  const { user } = useAuth();
  // const token = localStorage.getItem("access-token");
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
    enabled: !!user,
  });
  return { checkRole, isLoading, refetch };
};

export default useCheckRole;
