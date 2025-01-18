import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { format } from "date-fns";
import SectionHeader from "../../../../component/SectionHeader/SectionHeader";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payHistory = [] } = useQuery({
    queryKey: ["payHistory"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payment/history/${user?.email}`);
      return data;
    },
  });
  //   {"_id":{"$oid":"6788bfa7a1b2f3539b972ef4"},"employeeName":"Md. Abdullah All Shamem","employeeEmail":"abdullah107189@gmail.com","salary":{"$numberInt":"9999"},"monthAndYear":"2025-08","isPaymentSuccess":false,"paymentDate":"Thu Jan 16 2025 14:13:35 GMT 0600 (Bangladesh Standard Time)","transactionId":"268d3cbd5d"}
  return (
    <div>
      <SectionHeader title={"Payment History"}></SectionHeader>

      <div className="overflow-x-auto mt-5">
        <table className="table border">
          <thead className="">
            <tr className="p-2 pBg text-white">
              <th className="p-2 rounded-tl-lg"></th>
              <th className="p-2 ">Month,Year</th>
              <th className="p-2 ">Salary</th>
              <th className="p-2 ">Transaction Id</th>
              <th className="p-2">Date</th>
              <th className="p-2 rounded-tr-lg">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {payHistory?.map((history, idx) => (
              <tr key={idx} className="hover:bg-blue-100 ">
                <th className="border p-2">{idx + 1}</th>
                <td className="border p-2">
                  {format(history?.monthAndYear, "MMM yyyy")}
                </td>
                <td className="border p-2">$ {history?.salary}</td>
                <td className="border p-2">
                  {history?.transactionId ? (
                    <span>$ {history?.transactionId}</span>
                  ) : (
                    <span>--</span>
                  )}
                </td>
                <td className="border p-2">
                  {history?.paymentDate ? (
                    <span>{format(history?.paymentDate, "dd MMMM yyyy")}</span>
                  ) : (
                    <span>--</span>
                  )}
                </td>
                <td className="border p-2 ">
                  {!history?.isPaymentSuccess ? (
                    <span className="badge pText sBg font-bold">
                      Processing
                    </span>
                  ) : (
                    <span className="badge bg-green-200 text-green-400 font-bold">
                      Success
                    </span>
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

export default PaymentHistory;
