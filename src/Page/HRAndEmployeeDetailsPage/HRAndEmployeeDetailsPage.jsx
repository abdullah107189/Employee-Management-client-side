import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { CiBank } from "react-icons/ci";
import { FaDollarSign } from "react-icons/fa6";
import { MdOutlineVerified } from "react-icons/md";

const HRAndEmployeeDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: hrAndEmployeeDetails = {}, isLoading } = useQuery({
    queryKey: ["hrAndEmployeeDetails"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/hrAndEmployeeDetails/${id}`);
      return data;
    },
  });
  if (isLoading) {
    return "loading 😀";
  }
  console.log(hrAndEmployeeDetails);

  return (
    <div>
      <button onClick={() => navigate(-1)} className="actionBtn mb-2">
        Back
      </button>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <img
            referrerPolicy="no-referrer"
            src={hrAndEmployeeDetails?.userInfo.photoUrl}
            alt={hrAndEmployeeDetails?.userInfo.name}
            className="w-32 h-32 rounded-full border-4 object-cover border-blue-500 shadow-md"
          />
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              {hrAndEmployeeDetails?.userInfo.name}
            </h1>
            <p className="text-gray-600 text-lg">
              {hrAndEmployeeDetails?.userInfo.email}
            </p>
            <p className="text-gray-600 font-semibold text-lg">
              {hrAndEmployeeDetails?.designation}
            </p>

            <p className="text-green-500 bg-green-500/20 rounded-full font-semibold uppercase text-center w-3/4">
              {hrAndEmployeeDetails?.role}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Profile Details
          </h2>
          <div className="mt-4 flex items-center gap-5">
            <div className="flex justify-center items-center gap-2 badge  shadow-md text-xl p-3">
              <CiBank />
              {hrAndEmployeeDetails?.bankAccountNo}
            </div>

            {hrAndEmployeeDetails?.salary && (
              <div className="flex justify-center items-center gap-2 badge  shadow-md text-xl p-3">
                <FaDollarSign />
                {hrAndEmployeeDetails?.salary}
              </div>
            )}

            <div className="flex justify-center items-center gap-2 badge  shadow-md text-xl p-3">
              <MdOutlineVerified />
              {hrAndEmployeeDetails?.isVerified ? "Yes" : "No"}
            </div>
            <div className="flex justify-center items-center gap-2 badge  shadow-md text-xl p-3">
              🔥
              {hrAndEmployeeDetails?.isFired ? "Yes" : "No"}
            </div>
          </div>
        </div>
        {hrAndEmployeeDetails?.role === "hr" && (
          <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-blue-800">
              HR Specific Information
            </h3>
            <p className="mt-2">
              As an HR, you are responsible for managing employee relations and
              ensuring a positive workplace culture.
            </p>
          </div>
        )}

        {hrAndEmployeeDetails?.role === "employee" && (
          <div className="mt-8 p-4 bg-green-50 border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-green-800">
              Employee Specific Information
            </h3>
            <p className="mt-2">
              As an employee, you are encouraged to participate in team
              activities and contribute to the company&apos;s success.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRAndEmployeeDetailsPage;
