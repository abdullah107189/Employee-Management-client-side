import { format } from "date-fns";
import useGetWorkSheet from "../../../../hooks/useGetWorkSheet";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import SectionHeader from "../../../../component/SectionHeader/SectionHeader";

const Progress = () => {
  const [filterName, setFilterName] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [isFilter, setIsFilter] = useState(false);
  const axiosSecure = useAxiosSecure();
  //   all word sheet data
  const { workSheetList } = useGetWorkSheet();
  //   filter work sheet data
  const { data: filterWorkSheet = [] } = useQuery({
    queryKey: ["sheet", filterName, filterDate],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/progress?filterName=${filterName}&filterDate=${filterDate}`
      );
      return data;
    },
    enabled: Boolean(filterName || filterDate),
  });
  const handleFetchingChange = (e, filterType) => {
    const value = e.target.value;
    if (filterType === "employeeName") {
      setFilterName(value);
    }
    if (filterType === "filterDate") {
      setFilterDate(value);
    }
    setIsFilter(true);
  };
  const tableData = isFilter ? filterWorkSheet : workSheetList;
  const uniqeNameArray = [...new Set(workSheetList?.map((name) => name.name))];
  const uniqeDateArray = [
    ...new Set(workSheetList?.map((date) => date.monthAndYear)),
  ];
  return (
    <div>
      <SectionHeader title={"Employee Progress"}></SectionHeader>
      <div>
        <div className="flex items-center gap-3 justify-end mt-5">
          <select
            onChange={(e) => handleFetchingChange(e, "employeeName")}
            className="p-2 md:px-4 md:mr-2 outline-none rounded-full cursor-pointer border"
          >
            <option value="all">All</option>
            {uniqeNameArray?.map((name, idx) => (
              <option key={idx}>{name}</option>
            ))}
          </select>

          <select
            onChange={(e) => handleFetchingChange(e, "filterDate")}
            className="p-2 md:px-4 md:mr-2 outline-none rounded-full cursor-pointer border"
          >
            <option value="all">All</option>
            {uniqeDateArray?.map((date, idx) => (
              <option key={idx} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="table">
            <thead className="">
              <tr className="pBg text-white">
                <th className="rounded-tl-lg"></th>
                <th className="">Name</th>
                <th className="">Designation</th>
                <th className="">Hours</th>
                <th className="rounded-tr-lg">Date</th>
              </tr>
            </thead>
            <tbody className="">
              {tableData?.map((employee, idx) => (
                <tr key={employee._id} className="hover:bg-blue-50 ">
                  <th className="border">{idx + 1}</th>
                  <td className="border">{employee?.name}</td>
                  <td className="border">{employee?.work}</td>
                  <td className="border">{employee.hours}</td>
                  <td className="border">
                    {format(employee.date, "MMMM yyyy")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Progress;
