import { format } from "date-fns";
import useGetWorkSheet from "../../../../hooks/useGetWorkSheet";

const Progress = () => {
  {
    /* {
    "_id": "678724a58a746fcdd4a11025",
    "work": "Backend Developer",
    "hours": "23",
    "date": "2025-01-23T02:56:42.000Z",
    "email": "w8abdullah0002@gmail.com"
} */
  }

  const { workSheetList } = useGetWorkSheet();

  return (
    <div>
      <div>
        <select className="p-2 md:px-4 md:mr-2 outline-none rounded-full cursor-pointer">
          {workSheetList?.map((sheet) => (
            <option key={sheet?._id}>{sheet.name}</option>
          ))}
        </select>

        <select className="p-2 md:px-4 md:mr-2 outline-none rounded-full cursor-pointer">
          {workSheetList?.map((sheet) => (
            <option key={sheet?._id}>
              {format(sheet?.date, "MMMM yyyy")}
            </option>
          ))}
        </select>

        <div className="overflow-x-auto mt-5">
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
              {workSheetList?.map((employee, idx) => (
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
