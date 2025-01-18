/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import "./detailsPage.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

const DetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: details = {} } = useQuery({
    queryKey: ["details"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/details/${id}`);
      return data;
    },
  });

  const data = details[0]?.paymentInfo;
  const changeFormat = data?.map((d) => {
    d.monthAndYear = format(d.monthAndYear, "MMMM, yyyy");
  });

  return (
    <div>
      <button onClick={() => navigate(-1)} className="actionBtn mb-2">
        Back
      </button>
      <div className="flex mt-5 md:m-0 items-center p-4 border rounded-lg shadow-md">
        <img
          alt={details[0]?.userInfo?.name}
          src={details[0]?.userInfo?.photoUrl}
          className="w-16 h-16 rounded-full mr-4 object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{details[0]?.userInfo?.name}</h2>
          <p className="text-gray-600">{details[0]?.designation}</p>
        </div>
      </div>
      <div className="sBg mt-5 rounded-xl ">
        <h1 className="pt-5 text-4xl font-bold text-center">Analysis</h1>
        {data?.length > 0 ? (
          <div className="w-full md:h-[500px] h-[250px]  p-10">
            <ResponsiveContainer>
              <BarChart data={data}>
                <XAxis dataKey="monthAndYear" tick={{ fill: "#678ce4" }} />
                <YAxis dataKey="salary" tick={{ fill: "#678ce4" }} />
                <Tooltip />
                <Legend />
                <Bar maxBarSize={50} dataKey="salary" fill="#678ce4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center py-5 text-2xl font-semibold !">
            There are no payment history
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
