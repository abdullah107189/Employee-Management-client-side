import useGetUserData from "../../../../hooks/useGetUserData";

const AllEmployeeList = () => {
  const { allUsers, refetch } = useGetUserData();

  return (
    <div>
      <div className="overflow-x-auto mt-5">
        <table className="table">
          <thead className="">
            <tr className="pBg text-white">
              <th className="rounded-tl-lg"></th>
              <th className="">Name</th>
              <th className="">Designation</th>
              <th className="">Make HR</th>
              <th className="rounded-tr-lg">Fire</th>
            </tr>
          </thead>
          <tbody className="">
            {allUsers?.map((employee, idx) => (
              <tr key={employee._id} className="hover:bg-blue-50 ">
                <th className="border">{idx + 1}</th>
                <td className="border">{employee?.name}</td>
                <td className="border">{employee?.work}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployeeList;
