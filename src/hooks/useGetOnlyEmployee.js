import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetOnlyEmployee = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allEmployee = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allEmploye"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/onlyEmployee");
      return data;
    },
  });
  return { allEmployee, isLoading, refetch };
};

export default useGetOnlyEmployee;
