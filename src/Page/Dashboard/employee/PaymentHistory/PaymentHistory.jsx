import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPubilc";
import useAuth from "../../../../hooks/useAuth";
import { format } from "date-fns";
import SectionHeader from "../../../../component/SectionHeader/SectionHeader";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosPubilc = useAxiosPublic();
  const { data: payHistory = [] } = useQuery({
    queryKey: ["payHistory"],
    queryFn: async () => {
      const { data } = await axiosPubilc.get(`/payment/history/${user?.email}`);
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
              <th className="p-2 rounded-tr-lg">Date</th>
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
                <td className="border p-2">$ {history?.transactionId}</td>
                <td className="border p-2">
                  {format(history?.paymentDate, "dd MMMM yyyy")}
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
