import { VscUnverified } from "react-icons/vsc";
import { MdVerified } from "react-icons/md";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { PiSpinnerThin } from "react-icons/pi";
import { CiSquareInfo } from "react-icons/ci";
import { useState } from "react";
import { FaDollarSign } from "react-icons/fa6";
import toast from "react-hot-toast";
import SectionHeader from "../../../../component/SectionHeader/SectionHeader";
import useGetOnlyEmployee from "../../../../hooks/useGetOnlyEmployee";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const { allEmployee, refetch, isLoading } = useGetOnlyEmployee();
  const [showModal, setShowModal] = useState({
    isOpen: false,
    employeeInfo: "",
  });
  const axiosSecure = useAxiosSecure();

  const handleChangeVerify = async (id) => {
    // eslint-disable-next-line no-unused-vars
    const { data } = await axiosSecure.patch(`/verifyChange/${id}`);
    refetch();
  };

  //   pay modal
  const handlePayButton = async (e, employeeInfo) => {
    e.preventDefault();
    const form = e.target;
    const payRequest = {
      employeeName: employeeInfo?.userInfo?.name,
      employeeEmail: employeeInfo?.userInfo?.email,
      salary: parseInt(employeeInfo?.salary),
      monthAndYear: form.dateMonth.value,
      isPaymentSuccess: false,
    };
    try {
      const { data: payRequestFeedback } = await axiosSecure.post(
        "/payRequest",
        payRequest
      );
      if (payRequestFeedback.insertedId) {
        toast.success("Request sent to the admin");
        setShowModal(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setShowModal(false);
    }
  };
  return (
    <div>
      <SectionHeader title={"Employee List"}></SectionHeader>
      <div className="overflow-x-auto mt-5">
        <table className="table">
          <thead className="">
            <tr className="p-2 pBg text-white">
              <th className="p-2 rounded-tl-lg"></th>
              <th className="p-2 ">Name</th>
              <th className="p-2 ">Emial</th>
              <th className="p-2 ">Verified</th>
              <th className="p-2 ">Bank Account No.</th>
              <th className="p-2 ">Salary</th>
              <th className="p-2 ">Pay</th>
              <th className="p-2 rounded-tr-lg">Details</th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody className="animate-pulse">
              {Array.from({ length: 5 }).map((_, idx) => {
                return (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50 dark:hover:bg-gray-900"
                  >
                    <th className="border p-2">
                      <div className="skeleton w-10 h-5"></div>
                    </th>
                    <td className="border p-2">
                      <div className="skeleton w-20 h-5"></div>
                    </td>
                    <td className="border p-2">
                      <div className="skeleton w-52 h-5"></div>
                    </td>
                    <td className="border p-2">
                      <div className="flex items-center justify-center">
                        <MdVerified className="text-gray-300 w-6 h-6" />
                      </div>
                    </td>
                    <td className="border p-2">
                      <div className="skeleton w-20 h-5"></div>
                    </td>
                    <td className="border p-2">
                      <div className="skeleton w-20 h-5"></div>
                    </td>
                    <td className="border p-2">
                      <div className="flex items-center justify-center">
                        <p className="actionBtn hover:!bg-gray-300 !bg-gray-300 !border-gray-300  cursor-not-allowed">
                          Pay
                        </p>
                      </div>
                    </td>

                    <td className="border p-2">
                      <div className="flex items-center justify-center">
                        <CiSquareInfo className="w-10 h-10 rounded-full transform duration-300 hover:bg-orange-200 p-2 bg-orange-100 text-orange-400" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody className="">
              {allEmployee?.map((employee, idx) => (
                <tr
                  key={employee._id}
                  className="hover:bg-blue-50 text-black dark:text-gray-200 dark:hover:bg-gray-800 "
                >
                  <th className="border dark:border-gray-700 p-2">{idx + 1}</th>
                  <td className="border dark:border-gray-700 p-2">
                    {employee?.userInfo?.name}
                  </td>
                  <td className="border dark:border-gray-700 p-2">
                    {employee?.userInfo?.email}
                  </td>
                  <td className="border dark:border-gray-700 p-2">
                    <div className="flex items-center justify-center">
                      {isLoading ? (
                        <p>
                          <PiSpinnerThin className="dark:text-gray-200 text-gray-900 w-6 h-6" />
                        </p>
                      ) : (
                        <button
                          onClick={() => handleChangeVerify(employee._id)}
                        >
                          {employee.isVerified === true ? (
                            <MdVerified className="text-green-400 w-6 h-6" />
                          ) : (
                            <VscUnverified className="dark:text-gray-200 text-gray-900 w-6 h-6" />
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="border dark:border-gray-700 p-2">
                    {employee.bankAccountNo}
                  </td>
                  <td className="border dark:border-gray-700 p-2">
                    {employee.salary}
                  </td>
                  <td className="border dark:border-gray-700 p-2">
                    <div className="flex items-center justify-center">
                      {employee.isVerified === true ? (
                        <button
                          onClick={() =>
                            setShowModal({
                              isOpen: true,
                              employeeInfo: employee,
                            })
                          }
                          className="actionBtn"
                        >
                          Pay
                        </button>
                      ) : (
                        <button className="actionBtn hover:!bg-gray-300 !bg-gray-300 !border-gray-300  cursor-not-allowed">
                          Pay
                        </button>
                      )}
                    </div>
                  </td>

                  <td className="border dark:border-gray-700 p-2">
                    <div className="flex items-center justify-center">
                      <Link to={`/dashboard/employeeDetails/${employee?._id}`}>
                        <CiSquareInfo className="w-10 h-10 rounded-full transform duration-300 hover:bg-orange-200 p-2 dark:bg-orange-100/20 bg-orange-100 text-orange-400" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {showModal.isOpen && (
        <dialog id="my_modal_2" className="modal bg-black/40 " open>
          <div className="modal-box text-center">
            <a href="/" className="text-5xl font-bold">
              <span className="pText">As</span>Tech
            </a>
            <div className="min-h-[50vh] flex items-center  justify-center">
              <form
                className="mt-2 p-5 grid grid-cols-1 w-full gap-5 "
                onSubmit={(e) => handlePayButton(e, showModal.employeeInfo)}
              >
                <div className="grid grid-cols-2 gap-5">
                  {/* salary  */}
                  <div>
                    <label className="text-gray-700 mb-1" htmlFor="salary">
                      Your Salary
                    </label>
                    <div className="flex items-center border border-gray-300 rounded">
                      <div className="flex items-center">
                        <FaDollarSign className=" w-4 h-4 text-gray-500" />
                        <input
                          type="number"
                          id="salary"
                          defaultValue={showModal.employeeInfo.salary}
                          readOnly
                          name="salary"
                          className="flex-1 py-2 focus:outline-none"
                          placeholder="Enter your username"
                        />
                      </div>
                    </div>
                  </div>
                  {/* month */}
                  <div>
                    <label className="text-gray-700 mb-1" htmlFor="dateMonth">
                      Select Month and Year
                    </label>
                    <div
                      htmlFor="dateMonth"
                      className="flex items-center border border-gray-300 rounded"
                    >
                      <input
                        type="month"
                        name="date"
                        required
                        id="dateMonth"
                        className="flex-1 p-2 focus:outline-none"
                        placeholder="Enter your username"
                      />
                    </div>
                  </div>
                </div>

                <button className="actionBtn !p-2 !px-5">
                  Send Payment Request
                </button>
              </form>
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

export default EmployeeList;
