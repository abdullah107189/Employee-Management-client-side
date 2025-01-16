import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPubilc";

const useGetOnlyEmployee = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: allEmploye = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allEmploye"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/onlyEmployee");
      return data;
    },
  });
  return { allEmploye, isLoading, refetch };
};

export default useGetOnlyEmployee;
