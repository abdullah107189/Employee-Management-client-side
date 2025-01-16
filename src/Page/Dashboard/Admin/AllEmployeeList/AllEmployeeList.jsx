import { FaSortAmountUpAlt } from "react-icons/fa";
import useGetUserData from "../../../../hooks/useGetUserData";

const AllEmployeeList = () => {
  const { allUsers, refetch } = useGetUserData();
  //   {
  //     "_id": "67876b4652a3e79e31409d59",
  //     "userInfo": {
  //         "name": "w8abdullah",
  //         "email": "w8abdullah0002@gmail.com",
  //         "photoUrl": "https://i.ibb.co/DLMDDQX/e7f7eab4-f718-49ab-9084-b7e26b704e61.jpg"
  //     },
  //     "bankAccountNo": "234234",
  //     "designation": "Fullstack Developer",
  //     "salary": "2342",
  //     "isVerified": true,
  //     "role": "Employee"
  // }
  const handleIncreaseSalary = (id) => {
    console.log(id);
  };
  return (
    <div>
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
            {allUsers?.map((employee, idx) => (
              <tr key={idx} className="hover:bg-blue-50 ">
                <th className="border p-2">{idx + 1}</th>
                <td className="border p-2">{employee?.userInfo.name}</td>
                <td className="border p-2">{employee?.userInfo.email}</td>

                <td className="border p-2">
                  {employee.designation}
                </td>
                <td className="border p-2">{employee.bankAccountNo}</td>
                <td className="border p-2">{employee.salary}</td>
                <td className="border p-2 ">
                  <div className="flex items-center justify-center ">
                    <button onClick={() => handleIncreaseSalary(employee?._id)}>
                      <FaSortAmountUpAlt className="w-10 h-10 rounded-full transform duration-300 hover:bg-red-200 p-2 bg-red-100 text-red-400" />
                    </button>
                  </div>
                </td>
                <td className="border p-2 ">
                  <div className="flex items-center justify-center ">
                    <button onClick={() => handleIncreaseSalary(employee?._id)}>
                      <FaSortAmountUpAlt className="w-10 h-10 rounded-full transform duration-300 hover:bg-red-200 p-2 bg-red-100 text-red-400" />
                    </button>
                  </div>
                </td>
                <td className="border p-2 ">
                  <div className="flex items-center justify-center ">
                    <button onClick={() => handleIncreaseSalary(employee?._id)}>
                      <FaSortAmountUpAlt className="w-10 h-10 rounded-full transform duration-300 hover:bg-red-200 p-2 bg-red-100 text-red-400" />
                    </button>
                  </div>
                </td>
                <td className="border p-2 ">
                  <div className="flex items-center justify-center ">
                    <button onClick={() => handleIncreaseSalary(employee?._id)}>
                      <FaSortAmountUpAlt className="w-10 h-10 rounded-full transform duration-300 hover:bg-red-200 p-2 bg-red-100 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployeeList;
