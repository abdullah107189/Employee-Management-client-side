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
  const { data: filterWorkSheet = [], isLoading } = useQuery({
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
            className="p-2 md:px-4 md:mr-2 outline-none rounded-full cursor-pointer dark:border-gray-700 border"
          >
            <option value="all">All</option>
            {uniqeNameArray?.map((name, idx) => (
              <option key={idx}>{name}</option>
            ))}
          </select>

          <select
            onChange={(e) => handleFetchingChange(e, "filterDate")}
            className="p-2 md:px-4 md:mr-2 outline-none rounded-full cursor-pointer dark:border-gray-700 border"
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
            {isLoading ? (
              <tbody className="">
                {Array.from({ length: 5 }).map((_, idx) => {
                  return (
                    <tr key={idx} className="dark:hover:bg-gray-800 bg-blue-90  ">
                      <td className="dark:border-gray-700 border p-2">
                        <div className="skeleton w-10 h-5"></div>
                      </td>
                      <td className="dark:border-gray-700 border p-2">
                        <div className="skeleton w-40 h-6"></div>
                      </td>
                      <td className="dark:border-gray-700 border p-2">
                        <div className="skeleton w-40 h-6"></div>
                      </td>
                      <td className="dark:border-gray-700 border p-2">
                        <div className="skeleton w-10 h-6"></div>
                      </td>
                      <td className="dark:border-gray-700 border p-2">
                        <div className="skeleton w-40 h-6"></div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody className="">
                {tableData?.map((employee, idx) => (
                  <tr key={employee._id} className="dark:hover:bg-gray-800 bg-blue-90  ">
                    <th className="dark:border-gray-700 border">{idx + 1}</th>
                    <td className="dark:border-gray-700 border">{employee?.name}</td>
                    <td className="dark:border-gray-700 border">{employee?.work}</td>
                    <td className="dark:border-gray-700 border">{employee.hours}</td>
                    <td className="dark:border-gray-700 border">
                      {format(employee.date, "MMMM yyyy")}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Progress;
