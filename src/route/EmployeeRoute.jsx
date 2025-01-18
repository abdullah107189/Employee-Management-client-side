/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCheckRole from "../hooks/useCheckRole";

const EmployeeRoute = ({ children }) => {
  const { authLoading, user } = useAuth();
  const { checkRole, isLoading } = useCheckRole();
  const location = useLocation();
  if (authLoading || isLoading) {
    return "loading....";
  }
  if (user && checkRole === "employee") {
    return children;
  }
  return <Navigate to={"/login"} state={{location}} replace={true}></Navigate>;
};

export default EmployeeRoute;
