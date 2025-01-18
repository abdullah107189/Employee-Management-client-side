/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCheckRole from "../hooks/useCheckRole";

const HRRoute = ({ children }) => {
  const { authLoading, user } = useAuth();
  const { checkRole, isLoading } = useCheckRole();
  const location = useLocation();
  if (authLoading || isLoading) {
    return "loading....";
  }
  if (user && checkRole === "hr") {
    return children;
  }
  return <Navigate to={"/login"} state={location} replace={true}></Navigate>;
};

export default HRRoute;