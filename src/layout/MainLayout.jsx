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
        <div className="dark:bg-gray-900 text-black">
          <Navbar></Navbar>
          <div className="dark:bg-gray-900">
            <Outlet></Outlet>
          </div>
          <Footer></Footer>
        </div>
      )}
    </>
  );
};

export default MainLayout;
