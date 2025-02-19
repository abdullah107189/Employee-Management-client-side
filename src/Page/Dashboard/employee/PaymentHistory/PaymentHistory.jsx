import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { format } from "date-fns";
import SectionHeader from "../../../../component/SectionHeader/SectionHeader";
import { useState } from "react";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const { data: payHistory = {}, isLoading } = useQuery({
    queryKey: ["payHistory", user?.email, currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/payment/history/${user?.email}?page=${currentPage}&limit=${limit}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  // pagination
  const count = parseInt(payHistory?.count);
  const pages = Math.ceil(count / limit);

  return (
    <div>
      <SectionHeader title={"Payment History"}></SectionHeader>
      {isLoading ? (
        <>
          <div className="overflow-x-auto mt-5">
            <table className="table dark:border-gray-700 border">
              <thead className="">
                <tr className="p-2 pBg text-white">
                  <th className="p-2 rounded-tl-lg"></th>
                  <th className="p-2 ">Month,Year</th>
                  <th className="p-2 ">Salary</th>
                  <th className="p-2 rounded-tr-lg">Transaction Id</th>
                </tr>
              </thead>
              <tbody className="">
                {Array.from({ length: 5 }).map((_, idx) => {
                  return (
                    <tr key={idx} className="hover:bg-green-100 dark:hover:bg-gray-800">
                      <th className="dark:border-gray-700 border p-2">
                        <p className="w-10 h-5 skeleton"></p>
                      </th>
                      <td className="dark:border-gray-700 border p-2">
                        <p className="w-20 h-5 skeleton"></p>
                      </td>
                      <td className="dark:border-gray-700 border p-2">
                        <p className="w-20 h-5 skeleton"></p>
                      </td>
                      <td className="dark:border-gray-700 border p-2">
                        <p className="w-20 h-5 skeleton"></p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          {payHistory?.count > 0 ? (
            <div className="overflow-x-auto mt-5">
              <table className="table dark:border-gray-700 border">
                <thead className="">
                  <tr className="p-2 pBg text-white">
                    <th className="p-2 rounded-tl-lg"></th>
                    <th className="p-2 ">Month,Year</th>
                    <th className="p-2 ">Salary</th>
                    <th className="p-2 rounded-tr-lg">Transaction Id</th>
                  </tr>
                </thead>
                <tbody className="">
                  {payHistory?.result[0]?.firstPayment && (
                    <tr className="hover:bg-green-100 dark:hover:bg-gray-800">
                      <th className="dark:border-gray-700 border p-2">1</th>
                      <td className="dark:border-gray-700 border p-2">
                        {format(
                          payHistory?.result[0]?.firstPayment?.monthAndYear,
                          "MMM yyyy"
                        )}
                      </td>
                      <td className="dark:border-gray-700 border p-2">
                        $ {payHistory?.result[0]?.firstPayment?.salary}
                      </td>
                      <td className="dark:border-gray-700 border p-2">
                        {payHistory?.result[0]?.firstPayment?.transactionId ? (
                          <span>
                            ${" "}
                            {payHistory?.result[0]?.firstPayment?.transactionId}
                          </span>
                        ) : (
                          <span>--</span>
                        )}
                      </td>
                    </tr>
                  )}
                  {payHistory?.result[0]?.allPayment
                    ?.slice()
                    .map((history, idx) => (
                      <tr key={idx} className="hover:bg-blue-100 dark:hover:bg-gray-800">
                        <th className="dark:border-gray-700 border p-2">{idx + 1 + 1}</th>
                        <td className="dark:border-gray-700 border p-2">
                          {format(history?.monthAndYear, "MMM yyyy")}
                        </td>
                        <td className="dark:border-gray-700 border p-2">$ {history?.salary}</td>
                        <td className="dark:border-gray-700 border p-2">
                          {history?.transactionId ? (
                            <span>$ {history?.transactionId}</span>
                          ) : (
                            <span>--</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="min-h-[70vh] flex items-center justify-center md:text-5xl text-xl font-semibold ">
              There are no payment history
            </p>
          )}

          {/* pagination button  */}
          <div className="flex items-center justify-center gap-2 my-5">
            {[...Array(pages).keys()].map((btn, idx) => (
              <button
                onClick={() => setCurrentPage(idx + 1)}
                className={`${
                  currentPage === idx + 1
                    ? "activeActionBtn !bg-blue-400 !text-white"
                    : "actionBtn"
                }`}
                key={idx}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
