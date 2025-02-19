import { FaUser, FaLock, FaFan } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import employee1 from "../../../../assets/employee1.svg";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import GoogleLogin from "../../../../component/GoogleLogin/GoogleLogin";
import useAxiosPublic from "../../../../hooks/useAxiosPubilc";

const Login = () => {
  const { loginUser } = useAuth();
  const [firebaseLoading, setfirebaseLoading] = useState(false);
  const location = useLocation();
  const form = location?.state?.location?.pathname || "/";
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (d) => {
    setfirebaseLoading(true);

    try {
      await axiosPublic.get(`/allUser?isFiredEmail=${d?.email}`);
    } catch (error) {
      toast.error(error.response.data.message);
      setfirebaseLoading(false);
      if (error.status === 409) {
        return;
      }
    }

    await loginUser(d.email, d.password)
      .then((res) => {
        if (res.user) {
          toast.success("Login success 🙂");
          navigate(form);
          setfirebaseLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setfirebaseLoading(false);
      });
  };

  return (
    <div className="flex mt-3 items-center justify-between minH mxw dark:bg-gray-900">
      {/* Left Side Image */}
      <div
        className="md:w-1/2 hidden md:flex bg-cover bg-center"
        style={{
          backgroundImage: "url('https://source.unsplash.com/random/800x600')",
        }}
      >
        <img className="w-4/5 mx-auto" src={employee1} alt="" />
      </div>

      {/* Right Side Form */}
      <div className="md:w-1/2 w-full px-4 flex items-center justify-center ">
        <div className="bg-white dark:bg-gray-800 md:p-8 p-2 rounded-lg shadow-lg md:w-3/4 w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold text-center mb-6 pText">
              Login to Your Account
            </h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded">
                <FaUser className="ml-2 text-gray-500" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  {...register("email", { required: true })}
                  className="flex-1 bg-transparent dark:text-gray-200 p-2 focus:outline-none"
                  placeholder="Enter your username"
                />
              </div>
              {errors.email?.type === "required" && (
                <p className="text-red-400">Email is required</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded">
                <FaLock className="ml-2 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  {...register("password", { required: true, minLength: 6 })}
                  className="flex-1 p-2 bg-transparent dark:text-gray-200 focus:outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mx-2 text-gray-500 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-400">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-400">At least 6 characters</p>
              )}
            </div>
            <button type="submit" className="actionBtn  w-full text-center">
              {firebaseLoading ? (
                <span className="animate-spin inline-block">
                  <FaFan></FaFan>
                </span>
              ) : (
                <span>Login</span>
              )}
            </button>
            <p className="text-center mt-4 dark:text-gray-200">
              Don&apos;t have an account?{" "}
              <Link to={"/register"} className="pText font-semibold">
                Register
              </Link>
            </p>
            <div className="divider w-5/6 mx-auto"></div>
          </form>
          <GoogleLogin></GoogleLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
