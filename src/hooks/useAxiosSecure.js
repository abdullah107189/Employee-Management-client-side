import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:4545",
  withCredentials: true,
});
const useAxiosSecure = () => {
  // const { logoutUser } = useAuth();
  // const navigate = useNavigate();

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (error.response.status === 403 || error.response.status === 401) {
        // logoutUser();
        // navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
