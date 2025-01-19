import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import useAuth from "../hooks/useAuth";
import AuthLoading from "../component/AuthLoading/AuthLoading";
const MainLayout = () => {
  const { authLoading } = useAuth();
  return (
    <>
      {authLoading ? (
        <AuthLoading></AuthLoading>
      ) : (
        <div>
          <Navbar></Navbar>
          <div className="">
            <Outlet></Outlet>
          </div>
          <Footer></Footer>
        </div>
      )}
    </>
  );
};

export default MainLayout;
