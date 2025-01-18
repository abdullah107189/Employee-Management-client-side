import toast from "react-hot-toast";
import { useState } from "react";
import { FaFan, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPubilc";

const GoogleLogin = () => {
  const { socialLogin, setUser, logoutUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const form = location?.state?.location?.pathname || "/";
  const navigate = useNavigate();
  const [firebaseLoading, setfirebaseLoading] = useState(false);
  const handlGoogleLogin = async () => {
    socialLogin()
      .then(async (res) => {
        try {
          await axiosPublic.get(`/allUser?isFiredEmail=${res.user?.email}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setfirebaseLoading(false);
          if (error.status === 409) {
            await logoutUser();
            return;
          }
        }
        toast.success("Login Success Fully Done");
        setUser((prev) => {
          return { ...prev, photoURL: res.user.photoURL };
        });
        const userInfo = {
          userInfo: {
            name: res.user.displayName,
            email: res.user.email,
            photoUrl: res.user?.photoURL,
          },
          bankAccountNo: 123456,
          designation: "Frontend Developer",
          salary: 9999.0,
          isVerified: false,
          role: "employee",
        };

        navigate(form);
        await axiosPublic.post("/setUser", userInfo);
        setfirebaseLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setfirebaseLoading(false);
      });
  };
  return (
    <button
      onClick={handlGoogleLogin}
      type="submit"
      className="actionBtn w-full text-center flex items-center justify-center gap-3"
    >
      <FaGoogle className="w-5 h-5" />
      {firebaseLoading ? (
        <span className="animate-spin inline-block">
          <FaFan></FaFan>
        </span>
      ) : (
        <span> Google</span>
      )}
    </button>
  );
};

export default GoogleLogin;
