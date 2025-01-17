import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetWorkSheet = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: workSheetList = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["worksheets"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/work-sheet");
      return data;
    },
  });
  return { workSheetList, isLoading, refetch };
};

export default useGetWorkSheet;
