/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthLoading from "../component/AuthLoading/AuthLoading";

const PrivetRoute = ({ children }) => {
  const { authLoading, user } = useAuth();
  const location = useLocation();
  if (authLoading) {
    return <AuthLoading></AuthLoading>;
  }
  if (user) {
    return children;
  }
  return (
    <Navigate to={"/login"} state={{ location }} replace={true}></Navigate>
  );
};

export default PrivetRoute;
