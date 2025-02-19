/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { format } from "date-fns";
import { FaDollarSign } from "react-icons/fa6";
import SectionHeader from "../../../../component/SectionHeader/SectionHeader";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const PayRoll = () => {
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState({ isOpen: false, employee: "" });
  // all payment request data
  const {
    data: payRequestData = [],
    refetch,
    isLoading: payReqLoading,
  } = useQuery({
    queryKey: ["payRequestData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payRequest`);
      return data;
    },
  });

  return (
    <div>
      <SectionHeader title={"Employee Payment Place"}></SectionHeader>
      <div className="overflow-x-auto mt-5">
        <table className="table">
          <thead className="">
            <tr className="pBg text-white ">
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
            {payReqLoading
              ? Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <th className="dark:border-gray-700 border p-2">
                      <p className="w-5 h-3 mt-1 rounded-full bg-gray-300"></p>
                    </th>
                    <td className="dark:border-gray-700 border p-2">
                      <p className="w-20 h-3 mt-1 rounded-full bg-gray-300"></p>
                    </td>
                    <td className="dark:border-gray-700 border p-2">
                      <p className="w-40 h-3 mt-1 rounded-full bg-gray-300"></p>
                    </td>
                    <td className="dark:border-gray-700 border p-2">
                      <p className="w-20 h-3 mt-1 rounded-full bg-gray-300"></p>
                    </td>
                    <td className="dark:border-gray-700 border p-2">
                      <p className="w-20 h-3 mt-1 rounded-full bg-gray-300"></p>
                    </td>
                    <td className="dark:border-gray-700 border p-2">
                      <p className="w-20 h-3 mt-1 rounded-full bg-gray-300"></p>
                    </td>
                    <td className="dark:border-gray-700 border p-2">
                      <p className="w-40 h-3 mt-1 rounded-full bg-gray-300"></p>
                    </td>
                    <td className="dark:border-gray-700 border p-2">
                      <p className="w-20 h-3 mt-1 rounded-full bg-gray-300"></p>
                    </td>
                    <td className="dark:border-gray-700 border p-2">
                      <p className="w-14 h-3 mt-1 rounded-full bg-blue-300"></p>
                    </td>
                    <td className="dark:border-gray-700 border p-2">
                      <p className="w-20 h-3 mt-1 rounded-full bg-gray-300"></p>
                    </td>
                  </tr>
                ))
              : payRequestData?.map((employee, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 dark:hover:bg-gray-800">
                    <th className="dark:border-gray-700 border p-2">{idx + 1}</th>
                    <td className="dark:border-gray-700 border p-2">{employee?.employeeName}</td>
                    <td className="dark:border-gray-700 border p-2">{employee?.employeeEmail}</td>

                    <td className="dark:border-gray-700 border p-2">
                      {employee.employeeInfo.designation}
                    </td>
                    <td className="dark:border-gray-700 border p-2">
                      {format(employee?.monthAndYear, "MMMM yyyy")}
                    </td>
                    <td className="dark:border-gray-700 border p-2">{employee.salary}</td>
                    <td className="dark:border-gray-700 border p-2">
                      {employee?.transactionId ? (
                        <p>{employee?.transactionId}</p>
                      ) : (
                        <p>---</p>
                      )}
                    </td>
                    <td className="dark:border-gray-700 border p-2">{employee?.salary}</td>
                    <td className="dark:border-gray-700 border p-2 ">
                      <div className="flex items-center justify-center">
                        {employee?.isPaymentSuccess ? (
                          <p className="badge p-3 pb-4 bg-blue-100 text-blue-400 font-bold">
                            paid
                          </p>
                        ) : (
                          <button
                            onClick={() =>
                              setShowModal({ isOpen: true, employee: employee })
                            }
                          >
                            <FaDollarSign className="w-10 h-10 rounded-full transform duration-300 hover:bg-green-200 p-2 bg-green-100 text-green-400" />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="dark:border-gray-700 border p-2">
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
      {/* show modal when update button click */}
      {showModal.isOpen && (
        <dialog id="my_modal_2" className="modal bg-black/40 " open>
          <div className="modal-box text-center">
            <a href="/" className="text-5xl font-bold">
              <span className="pText">As</span>Tech
            </a>
            <div className="min-h-[50vh] flex flex-col items-center  justify-center">
              <h1 className="flex items-center justify-center gap-2 p-2 dark:border-gray-700 border rounded-xl shadow-md mb-5 font-bold text-3xl ">
                <FaDollarSign></FaDollarSign> {showModal?.employee?.salary}
              </h1>
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  employee={showModal?.employee}
                  refetch={refetch}
                  setShowModal={setShowModal}
                ></CheckoutForm>
              </Elements>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowModal(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default PayRoll;
