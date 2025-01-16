import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPubilc";
import { format } from "date-fns";
import { FaDollarSign } from "react-icons/fa6";

const PayRoll = () => {
  const axiosPubilc = useAxiosPublic();
  const { data: payRequestData = [] } = useQuery({
    queryKey: ["payRequestData"],
    queryFn: async () => {
      const { data } = await axiosPubilc.get(`/payRequest`);
      return data;
    },
  });

  // payment
  const handlePayment = (id) => {
    console.log(id);
  };
  return (
    <div>
      <div className="overflow-x-auto mt-5">
        <table className="table">
          <thead className="">
            <tr className="pBg text-white">
              <th className="rounded-tl-lg"></th>
              <th className="">Name</th>
              <th className="">Email</th>
              <th className="">Designation</th>
              <th className="">Month, Year</th>
              <th className="">Amount</th>
              <th className="">Transaction Id</th>
              <th className="">Salary</th>
              <th className="">Pay</th>
              <th className="rounded-tr-lg">Payment Date</th>
            </tr>
          </thead>
          <tbody className="">
            {payRequestData?.map((employee, idx) => (
              <tr key={idx} className="hover:bg-blue-50 ">
                <th className="border">{idx + 1}</th>
                <td className="border">{employee?.employeeName}</td>
                <td className="border">{employee?.employeeEmail}</td>

                <td className="border">{employee.employeeInfo.designation}</td>
                <td className="border">
                  {format(employee?.monthAndYear, "MMMM yyyy")}
                </td>
                <td className="border">{employee.salary}</td>
                <td className="border">---</td>
                <td className="border">{employee?.salary}</td>
                <td className="border ">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handlePayment(employee._id)}
                      className=""
                    >
                      <FaDollarSign className="w-10 h-10 rounded-full transform duration-300 hover:bg-green-200 p-2 bg-green-100 text-green-400" />
                    </button>
                  </div>
                </td>
                <td className="border">---</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayRoll;
