import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { format } from "date-fns";
import { FaDollarSign } from "react-icons/fa6";
import toast from "react-hot-toast";
import SectionHeader from "../../../../component/SectionHeader/SectionHeader";

const PayRoll = () => {
  const axiosSecure = useAxiosSecure();

  // all payment request data
  const { data: payRequestData = [], refetch } = useQuery({
    queryKey: ["payRequestData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payRequest`);
      return data;
    },
  });

  console.log(payRequestData);
  // payment
  const handlePayment = async (id) => {
    const { data } = await axiosSecure.patch(
      `/payment-update/${id}?paymentDate=${new Date()}`
    );
    if (data.modifiedCount > 0) {
      toast.success("Payment Successful ✅");
    }
    refetch();
  };
  return (
    <div>
      <SectionHeader title={"Employee Payment Place"}></SectionHeader>
      <div className="overflow-x-auto mt-5">
        <table className="table">
          <thead className="">
            <tr className="pBg text-white">
              <th className="p-2 rounded-tl-lg"></th>
              <th className="p-2 ">Name</th>
              <th className="p-2 ">Email</th>
              <th className="p-2 ">Designation</th>
              <th className="p-2 ">Month, Year</th>
              <th className="p-2 ">Amount</th>
              <th className="p-2 ">Transaction Id</th>
              <th className="p-2 ">Salary</th>
              <th className="p-2 ">Pay</th>
              <th className="p-2 rounded-tr-lg">Payment Date</th>
            </tr>
          </thead>
          <tbody className="">
            {payRequestData?.map((employee, idx) => (
              <tr key={idx} className="hover:bg-blue-50 ">
                <th className="border p-2">{idx + 1}</th>
                <td className="border p-2">{employee?.employeeName}</td>
                <td className="border p-2">{employee?.employeeEmail}</td>

                <td className="border p-2">
                  {employee.employeeInfo.designation}
                </td>
                <td className="border p-2">
                  {format(employee?.monthAndYear, "MMMM yyyy")}
                </td>
                <td className="border p-2">{employee.salary}</td>
                <td className="border p-2">
                  {employee?.transactionId ? (
                    <p>{employee?.transactionId}</p>
                  ) : (
                    <p>---</p>
                  )}
                </td>
                <td className="border p-2">{employee?.salary}</td>
                <td className="border p-2 ">
                  <div className="flex items-center justify-center">
                    {employee?.isPaymentSuccess ? (
                      <p className="badge p-3 pb-4 bg-blue-100 text-blue-400 font-bold">
                        paid
                      </p>
                    ) : (
                      <button onClick={() => handlePayment(employee._id)}>
                        <FaDollarSign className="w-10 h-10 rounded-full transform duration-300 hover:bg-green-200 p-2 bg-green-100 text-green-400" />
                      </button>
                    )}
                  </div>
                </td>
                <td className="border p-2">
                  {employee?.paymentDate ? (
                    <p>{format(employee?.paymentDate, "dd MMMM yyyy")}</p>
                  ) : (
                    <p>---</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayRoll;
