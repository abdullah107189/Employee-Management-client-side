import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://employee-management-server-side-wheat.vercel.app",
  // baseURL: "http://localhost:4545",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
