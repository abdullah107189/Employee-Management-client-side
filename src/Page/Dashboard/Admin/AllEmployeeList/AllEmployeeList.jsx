import { FaSortAmountUpAlt, FaTh } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import { CgArrowsExchangeAltV, CgMail } from "react-icons/cg";
import { CiBank, CiSquareInfo } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import SectionHeader from "../../../../component/SectionHeader/SectionHeader";
import { Link } from "react-router-dom";
import {
  FaClipboardUser,
  FaDollarSign,
  FaTable,
  FaUser,
} from "react-icons/fa6";
import { MdWork } from "react-icons/md";

const AllEmployeeList = () => {
  const [showModal, setShowModal] = useState({
    isOpen: false,
    employeeInfo: "",
  });
  const [isGridView, setIsGridView] = useState("table");

  const axiosSecure = useAxiosSecure();
  const {
    data: verifiedEmployee = [],
    refetch,
    isLoading: tableLoading,
  } = useQuery({
    queryKey: ["verifiedEmployee"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/allUser?isVerify=${true}`);
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
      const { data } = await axiosSecure.patch(
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

  const handlefire = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Fire 🔥",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(`/fire/${email}`);
        if (data.modifiedCount > 0) {
          toast.success("Fired 😨");
          setShowModal({ isOpen: false });
          refetch();
        }
      }
    });
  };

  const handleMakeHR = (email, role) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Can you Change the ${role === "hr" ? "HR" : "Employee"} to ${
        role === "hr" ? "Employee" : "HR"
      }  ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: `${role == "hr" ? "red" : "green"}`,
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${
        role !== "hr" ? "Promotion HR" : "Demotion Employee"
      }`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(`/change/role/${email}`, {
          role: role,
        });
        if (data.modifiedCount > 0) {
          toast.success("Changed role");
          refetch();
        }
      }
    });
  };
  return (
    <div className=" dark:bg-gray-900">
      <SectionHeader title={"All Employee & HR List"}></SectionHeader>
      <div className="text-end mr-2">
        <button
          onClick={() => setIsGridView("table")}
          className=" sBg p-2 rounded-l-lg dark:bg-gray-700"
        >
          <FaTable
            className={`${
              isGridView === "table" && "pText"
            } bg-white dark:bg-gray-700 w-7 h-7 rounded-md p-1`}
          />
        </button>
        <button
          onClick={() => setIsGridView("grid")}
          className=" sBg p-2 rounded-r-lg dark:bg-gray-700"
        >
          <FaTh
            className={`${
              isGridView === "grid" && "pText"
            } bg-white dark:bg-gray-700 w-7 h-7 rounded-md p-1`}
          />
        </button>
      </div>
      {isGridView === "table" && (
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
              {tableLoading
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      <th className="dark:border-gray-700 border  p-2">
                        <p className="w-5 h-3 mt-1 rounded-full bg-gray-300"></p>
                      </th>
                      <td className="dark:border-gray-700 border  p-2">
                        <p className="w-20 h-3 mt-1 rounded-full bg-gray-300"></p>
                      </td>
                      <td className="dark:border-gray-700 border  p-2">
                        <p className="w-40 h-3 mt-1 rounded-full bg-gray-300"></p>
                      </td>
                      <td className="dark:border-gray-700 border  p-2">
                        <p className="w-20 h-3 mt-1 rounded-full bg-gray-300"></p>
                      </td>
                      <td className="dark:border-gray-700 border  p-2">
                        <p className="w-20 h-3 mt-1 rounded-full bg-gray-300"></p>
                      </td>
                      <td className="dark:border-gray-700 border  p-2">
                        <p className="w-20 h-3 mt-1 rounded-full bg-gray-300"></p>
                      </td>
                      {/* update salary  */}
                      <td className="dark:border-gray-700 border  p-2 ">
                        <div className="flex items-center justify-center ">
                          <FaSortAmountUpAlt className="w-10 h-10 rounded-full transform duration-300 dark:hover:bg-green-800  p-2 bg-green-100 dark:bg-green-200/20 text-green-400" />
                        </div>
                      </td>

                      {/* fire  */}
                      <td className="dark:border-gray-700 border  p-2 ">
                        <div className="flex items-center justify-center ">
                          <ImFire className="w-10 h-10 rounded-full transform duration-300 hover:bg-red-200 p-2 bg-red-100 text-red-400" />
                        </div>
                      </td>

                      {/* make hr  */}
                      <td className="dark:border-gray-700 border  p-2 ">
                        <div className="flex items-center justify-center  flex-col">
                          <CgArrowsExchangeAltV
                            className={`w-10 h-10 rounded-full transform duration-300 hover:bg-green-300 p-2 bg-green-200 text-green-500`}
                          />
                          <p className="w-20 h-3 mt-1 rounded-full bg-gray-300"></p>
                          <span className="font-bold px-1 dark:border-gray-700 border  rounded-full bg-gray-100"></span>
                        </div>
                      </td>

                      {/* details  */}
                      <td className="dark:border-gray-700 border  p-2">
                        <CiSquareInfo className="w-10 h-10 rounded-full transform duration-300 hover:bg-orange-200 p-2 bg-orange-100 text-orange-400" />
                      </td>
                    </tr>
                  ))
                : verifiedEmployee?.map((employee, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-blue-50 dark:hover:bg-gray-800 "
                    >
                      <th className="dark:border-gray-700 border  p-2">
                        {idx + 1}
                      </th>
                      <td className="dark:border-gray-700 border  p-2">
                        {employee?.userInfo.name}
                      </td>
                      <td className="dark:border-gray-700 border  p-2">
                        {employee?.userInfo.email}
                      </td>

                      <td className="dark:border-gray-700 border  p-2">
                        {employee.designation}
                      </td>
                      <td className="dark:border-gray-700 border  p-2">
                        {employee.bankAccountNo}
                      </td>
                      <td className="dark:border-gray-700 border  p-2">
                        {employee.salary}
                      </td>
                      {/* update salary  */}
                      <td className="dark:border-gray-700 border  p-2 ">
                        <div className="flex items-center justify-center ">
                          <button
                            onClick={() =>
                              setShowModal({
                                isOpen: true,
                                employeeInfo: employee,
                              })
                            }
                          >
                            <FaSortAmountUpAlt className="w-10 h-10 rounded-full transform duration-300 hover:bg-green-200 p-2 bg-green-100 text-green-400" />
                          </button>
                        </div>
                      </td>

                      {/* fire  */}
                      <td className="dark:border-gray-700 border  p-2 ">
                        <div className="flex items-center justify-center ">
                          {employee?.isFired ? (
                            <p className="badge p-3 pb-4 bg-red-100 text-red-400 font-bold">
                              fired
                            </p>
                          ) : (
                            <button
                              onClick={() =>
                                handlefire(employee?.userInfo.email)
                              }
                            >
                              <ImFire className="w-10 h-10 rounded-full transform duration-300 hover:bg-red-200 p-2 bg-red-100 text-red-400" />
                            </button>
                          )}
                        </div>
                      </td>

                      {/* make hr  */}
                      <td className="dark:border-gray-700 border  p-2 ">
                        <div className="flex items-center justify-center  flex-col">
                          {employee?.isFired ? (
                            <button>
                              <CgArrowsExchangeAltV className="bg-gray-400 text-gray-200 hover:bg-gray-400 cursor-not-allowed disabled w-10 h-10 rounded-full transform duration-300 p-2 text-blue-40" />
                            </button>
                          ) : (
                            <>
                              {employee?.role === "employee" ? (
                                <button
                                  onClick={() =>
                                    handleMakeHR(
                                      employee?.userInfo?.email,
                                      "employee"
                                    )
                                  }
                                >
                                  <CgArrowsExchangeAltV
                                    className={`w-10 h-10 rounded-full transform duration-300 hover:bg-green-300 p-2 bg-green-200 text-green-500`}
                                  />
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleMakeHR(
                                      employee?.userInfo?.email,
                                      "hr"
                                    )
                                  }
                                >
                                  <CgArrowsExchangeAltV
                                    className={`w-10 h-10 rounded-full transform duration-300 hover:bg-red-200 p-2 bg-red-100 text-red-400`}
                                  />
                                </button>
                              )}
                            </>
                          )}
                          <p className="text-[10px]">
                            Role is :{" "}
                            <span className="font-bold px-1 dark:border-gray-700 border  rounded-full dark:bg-gray-800 bg-gray-100">
                              {employee?.role === "hr" ? "HR" : "Employee"}
                            </span>
                          </p>
                        </div>
                      </td>

                      {/* details  */}
                      <td className="dark:border-gray-700 border  p-2">
                        <Link
                          to={`/dashboard/hrAndEmployeeDetails/${employee?._id}`}
                        >
                          <CiSquareInfo className="w-10 h-10 rounded-full transform duration-300 hover:bg-orange-200 p-2 bg-orange-100 text-orange-400" />
                        </Link>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      )}

      {isGridView === "grid" && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-3 xl:grid-cols-4 mt-5">
            {verifiedEmployee?.map((employee) => (
              <div
                key={employee?._id}
                className="dark:border-gray-700 border  flex flex-col bg-white dark:bg-gray-800 md:p-2 p-2 rounded-xl"
              >
                <img
                  src={employee?.userInfo?.photoUrl}
                  alt={employee?.userInfo?.name}
                  className="w-20 h-20 object-cover rounded-full mx-auto dark:border-gray-700 border-2 border-blue-400"
                />
                <h1 className="flex items-center md:text-xl text-[16px] gap-2 font-bold ">
                  <FaUser></FaUser> {employee?.userInfo?.name}
                </h1>
                <h1 className="flex items-center gap-2 font-semibold md:text-base text-[14px]">
                  <CgMail></CgMail> {employee?.userInfo?.name}
                </h1>

                <div className="flex flex-wrap gap-2 md:text-base text-[11px] flex-grow">
                  {/* role  */}
                  <h1 className="flex items-center gap-1 rounded font-semibold ">
                    <FaClipboardUser />
                    <span className="bg-green-500/30 bg-green-500 px-2 rounded-xl uppercase text-xs">
                      {employee?.role}
                    </span>
                  </h1>
                  {/* designation  */}
                  <h1 className="flex items-center gap-1 rounded font-semibold">
                    <MdWork />
                    <span className="sBg dark:bg-gray-700 rounded-xl uppercase text-xs px-1">
                      {employee?.designation}
                    </span>
                  </h1>
                  {/* bank number  */}
                  <h1 className="flex items-center gap-1 rounded font-semibold">
                    <CiBank />
                    <span className="sBg dark:bg-gray-700 rounded-xl uppercase text-xs px-1">
                      {employee?.role}
                    </span>
                  </h1>
                  {/* salary  */}
                  <h1 className="flex items-center gap-1 rounded font-semibold">
                    <FaDollarSign />
                    <span className="sBg dark:bg-gray-700 rounded-xl uppercase text-xs px-1">
                      {employee?.salary}
                    </span>
                  </h1>
                </div>

                {/* ***********action button ***********  */}

                <div className="flex justify-between items-center mt-2  ">
                  {/* fire  */}
                  <div className="flex flex-col justify-center items-center gap-1">
                    <p className="font-semibold md:text-base text-[11px]">
                      Fire
                    </p>
                    <div className=" ">
                      {employee?.isFired ? (
                        <p className="badge p-3 pb-4 bg-red-100 text-red-400 font-bold">
                          fired
                        </p>
                      ) : (
                        <button
                          onClick={() => handlefire(employee?.userInfo.email)}
                        >
                          <ImFire className="w-10 h-10 rounded-full transform duration-300 hover:bg-red-200 p-2 bg-red-100 text-red-400" />
                        </button>
                      )}
                    </div>
                  </div>
                  {/* role change  */}
                  <div className="flex flex-col justify-center items-center gap-1">
                    <p className="font-semibold md:text-base text-[11px]">
                      Change Role
                    </p>
                    <div className="">
                      {employee?.isFired ? (
                        <button>
                          <CgArrowsExchangeAltV className="bg-gray-400 text-gray-200 hover:bg-gray-400 cursor-not-allowed disabled w-10 h-10 rounded-full transform duration-300 p-2 text-blue-40" />
                        </button>
                      ) : (
                        <>
                          {employee?.role === "employee" ? (
                            <button
                              onClick={() =>
                                handleMakeHR(
                                  employee?.userInfo?.email,
                                  "employee"
                                )
                              }
                            >
                              <CgArrowsExchangeAltV
                                className={`w-10 h-10 rounded-full transform duration-300 hover:bg-green-300 p-2 bg-green-200 text-green-500`}
                              />
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleMakeHR(employee?.userInfo?.email, "hr")
                              }
                            >
                              <CgArrowsExchangeAltV
                                className={`w-10 h-10 rounded-full transform duration-300 hover:bg-red-200 p-2 bg-red-100 text-red-400`}
                              />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* details button  */}
                  <div className="flex flex-col justify-center items-center gap-1">
                    <p className="font-semibold md:text-base text-[11px]">
                      Details
                    </p>
                    <Link
                      to={`/dashboard/hrAndEmployeeDetails/${employee?._id}`}
                    >
                      <CiSquareInfo className="w-10 h-10 rounded-full transform duration-300 hover:bg-orange-200 p-2 bg-orange-100 text-orange-400" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
                <div className="dark:border-gray-700 border  dark:border-gray-700 border -gray-200 p-5 rounded-3xl shadow-lg">
                  <p className="font-bold">Old Salary</p>
                  <input
                    required
                    defaultValue={showModal?.employeeInfo?.salary}
                    className="p-2 cursor-default mt-2 w-full dark:border-gray-700 border  px-4 mr-2 outline-none rounded-full "
                    readOnly
                    type="number"
                    name=""
                    id=""
                  />
                </div>
                <div className="dark:border-gray-700 border  dark:border-gray-700 border -gray-200 p-5 rounded-3xl shadow-lg">
                  <p className="font-bold">Update Salary</p>
                  <input
                    required
                    className="p-2 focus:shadow-lg w-full mt-2 dark:border-gray-700 border  px-4 mr-2 outline-none rounded-full cursor-pointer"
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
