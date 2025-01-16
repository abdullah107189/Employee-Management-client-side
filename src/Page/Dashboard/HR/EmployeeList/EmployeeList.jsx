import { VscUnverified } from "react-icons/vsc";
import useGetUserData from "../../../../hooks/useGetUserData";
import { MdDateRange, MdVerified } from "react-icons/md";
import useAxiosPublic from "../../../../hooks/useAxiosPubilc";
import { PiSpinnerThin } from "react-icons/pi";
import { CiSquareInfo } from "react-icons/ci";
import { useState } from "react";
import { FaDollarSign } from "react-icons/fa6";
import toast from "react-hot-toast";

const EmployeeList = () => {
  const { allUsers, isLoading, refetch } = useGetUserData();
  const [showModal, setShowModal] = useState({
    isOpen: false,
    employeeInfo: "",
  });
  const axiosPubilc = useAxiosPublic();
  const handleChangeVerify = async (id) => {
    // eslint-disable-next-line no-unused-vars
    const { data } = await axiosPubilc.patch(`/verifyChange/${id}`);
    refetch();
  };
  //   modal
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
      const { data: payRequestFeedback } = await axiosPubilc.post(
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
      <div className="overflow-x-auto mt-5">
        <table className="table">
          <thead className="">
            <tr className="pBg text-white">
              <th className="rounded-tl-lg"></th>
              <th className="">Name</th>
              <th className="">Emial</th>
              <th className="">Verified</th>
              <th className="">Bank Account No.</th>
              <th className="">Salary</th>
              <th className="">Pay</th>
              <th className="rounded-tr-lg">Details</th>
            </tr>
          </thead>
          <tbody className="">
            {allUsers?.map((employee, idx) => (
              <tr key={employee._id} className="hover:bg-blue-50 ">
                <th className="border">{idx + 1}</th>
                <td className="border">{employee?.userInfo?.name}</td>
                <td className="border">{employee?.userInfo?.email}</td>
                <td className="border">
                  <div className="flex items-center justify-center">
                    {isLoading ? (
                      <p>
                        <PiSpinnerThin className="text-gray-900 w-6 h-6" />
                      </p>
                    ) : (
                      <button onClick={() => handleChangeVerify(employee._id)}>
                        {employee.isVerified === true ? (
                          <MdVerified className="text-green-400 w-6 h-6" />
                        ) : (
                          <VscUnverified className="text-gray-900 w-6 h-6" />
                        )}
                      </button>
                    )}
                  </div>
                </td>
                <td className="border">{employee.bankAccountNo}</td>
                <td className="border">{employee.salary}</td>
                <td className="border">
                  <div className="flex items-center justify-center">
                    {employee.isVerified === true ? (
                      <button
                        onClick={() =>
                          setShowModal({ isOpen: true, employeeInfo: employee })
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

                <td className="border ">
                  <button onClick={() => employee?._id}>
                    <CiSquareInfo className="w-10 h-10 rounded-full transform duration-300 hover:bg-green-200 p-2 bg-green-100 text-green-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
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
                    <div className="flex items-center border border-gray-300 rounded">
                      <MdDateRange className=" text-gray-500" />
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
