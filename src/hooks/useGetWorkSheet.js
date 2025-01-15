import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPubilc";

const useGetWorkSheet = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: workSheetList = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["worksheets"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/work-sheet");
      return data;
    },
  });
  return { workSheetList, isLoading, refetch };
};

export default useGetWorkSheet;
