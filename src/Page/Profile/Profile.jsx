import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import {
  FaBriefcase,
  FaCheckCircle,
  FaDollarSign,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: data = [] } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/userInfo?email=${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });
  console.log(data);
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden mt-10">
      <div className="md:flex flex-col md:flex-row justify-center md:gap-10 items-center p-4">
        <div className="flex items-center justify-center">
          <img
            className="lg:w-[500px] md:w-[300px] border-2 dark:border-gray-700 border-gray-300"
            src={data?.userInfo?.photoUrl}
            alt={data?.userInfo?.name}
          />
        </div>
        <div className="ml-4">
          <h2 className="text-3xl text-black/70 dark:text-gray-200 font-semibold flex items-center">
            <FaUser className="mr-2" /> {data?.userInfo?.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-200 flex items-center">
            <FaEnvelope className="mr-2" /> {data?.userInfo?.email}
          </p>
          <p className="text-gray-600 dark:text-gray-200 flex items-center">
            <FaBriefcase className="mr-2" /> {data?.designation}
          </p>
          <p className="text-gray-600 dark:text-gray-200 flex items-center">
            <span>Role:</span> <span className="ml-1">{data?.role}</span>
          </p>
          <p className="text-gray-600 dark:text-gray-200 flex items-center">
            <FaDollarSign className="mr-2" /> Salary: ${data?.salary}
          </p>
          <p className="text-gray-600 dark:text-gray-200 flex items-center">
            <span>Account No:</span>{" "}
            <span className="ml-1">{data?.bankAccountNo}</span>
          </p>
          {data?.isVerified && (
            <span className="text-green-500 font-bold flex items-center">
              <FaCheckCircle className="mr-2" /> Verified
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
