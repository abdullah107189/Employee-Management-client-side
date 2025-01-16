import { FaSortAmountUpAlt } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { CiSquareInfo } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPubilc";
import { useState } from "react";
import toast from "react-hot-toast";

const AllEmployeeList = () => {
  const [showModal, setShowModal] = useState({
    isOpen: false,
    employeeInfo: "",
  });

  const axiosPubilc = useAxiosPublic();
  const { data: verifiedEmployee = [], refetch } = useQuery({
    queryKey: ["verifiedEmployee"],
    queryFn: async () => {
      const { data } = await axiosPubilc.get(`/allUser?isVerify=${true}`);
      return data;
    },
  });

  const handleUpdateSalary = async (e, employeeInfo) => {
    e.preventDefault();
    const salary = parseInt(employeeInfo.salary);
    const value = parseInt(e.target.salary.value);

    if (salary >= value) {
      return toast.error("You can only increase");
    }
    if (salary < value) {
      const { data } = await axiosPubilc.patch(
        `/user/update/${employeeInfo._id}`,
        { salary: value }
      );
      if (data.modifiedCount > 0) {
        toast.success("Update Salary");
        setShowModal({ isOpen: false });
        refetch();
      }
    }
  };
  return (
    <div className="">
      <div className="overflow-x-auto mt-5">
        <table className="table">
          <thead className="">
            <tr className="pBg text-white">
              <th className="p-2 rounded-tl-lg"></th>
              <th className="p-2 ">Name</th>
              <th className="p-2 ">Email</th>
              <th className="p-2 ">Designation</th>
              <th className="p-2 ">Bank Account No.</th>
              <th className="p-2 ">Salary</th>
              <th className="p-2 ">Promotion Salary</th>
              <th className="p-2 ">Fire</th>
              <th className="p-2 ">Make HR</th>
              <th className="p-2 rounded-tr-lg">Details</th>
            </tr>
          </thead>
          <tbody className="">
            {verifiedEmployee?.map((employee, idx) => (
              <tr key={idx} className="hover:bg-blue-50 ">
                <th className="border p-2">{idx + 1}</th>
                <td className="border p-2">{employee?.userInfo.name}</td>
                <td className="border p-2">{employee?.userInfo.email}</td>

                <td className="border p-2">{employee.designation}</td>
                <td className="border p-2">{employee.bankAccountNo}</td>
                <td className="border p-2">{employee.salary}</td>
                <td className="border p-2 ">
                  <div className="flex items-center justify-center ">
                    <button
                      onClick={() =>
                        setShowModal({ isOpen: true, employeeInfo: employee })
                      }
                    >
                      <FaSortAmountUpAlt className="w-10 h-10 rounded-full transform duration-300 hover:bg-green-200 p-2 bg-green-100 text-green-400" />
                    </button>
                  </div>
                </td>
                <td className="border p-2 ">
                  <div className="flex items-center justify-center ">
                    <button onClick={() => handleIncreaseSalary(employee?._id)}>
                      <ImFire className="w-10 h-10 rounded-full transform duration-300 hover:bg-red-200 p-2 bg-red-100 text-red-400" />
                    </button>
                  </div>
                </td>
                <td className="border p-2 ">
                  <div className="flex items-center justify-center ">
                    <button onClick={() => handleIncreaseSalary(employee?._id)}>
                      <CgArrowsExchangeAltV className="w-10 h-10 rounded-full transform duration-300 hover:bg-blue-200 p-2 bg-blue-100 text-blue-400" />
                    </button>
                  </div>
                </td>
                <td className="border p-2">
                  <button onClick={() => employee?._id}>
                    <CiSquareInfo className="w-10 h-10 rounded-full transform duration-300 hover:bg-orange-200 p-2 bg-orange-100 text-orange-400" />
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
                onSubmit={(e) => handleUpdateSalary(e, showModal.employeeInfo)}
              >
                <div className="border border-gray-200 p-5 rounded-3xl shadow-lg">
                  <p className="font-bold">Old Salary</p>
                  <input
                    required
                    defaultValue={showModal?.employeeInfo?.salary}
                    className="p-2 cursor-default mt-2 w-full border px-4 mr-2 outline-none rounded-full "
                    readOnly
                    type="number"
                    name=""
                    id=""
                  />
                </div>
                <div className="border border-gray-200 p-5 rounded-3xl shadow-lg">
                  <p className="font-bold">Update Salary</p>
                  <input
                    required
                    className="p-2 focus:shadow-lg w-full mt-2 border px-4 mr-2 outline-none rounded-full cursor-pointer"
                    placeholder="Update Salary"
                    type="number"
                    name="salary"
                    id=""
                  />
                </div>
                <button className="actionBtn !p-2 !px-5">Update Salary</button>
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

export default AllEmployeeList;
