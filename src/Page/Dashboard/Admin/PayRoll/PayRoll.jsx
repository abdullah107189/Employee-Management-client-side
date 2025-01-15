const PayRoll = () => {
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
    </div>
  );
};

export default PayRoll;
