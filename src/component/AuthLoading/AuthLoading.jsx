import { FaSpinner } from "react-icons/fa";
import "./authLoading.css";
const AuthLoading = () => {
  return (
    <div className="flex fixed flex-col gap-3 items-center justify-center inset-0 bg-black/20 w-full h-full">
      <span className="animate-spin ">
        <FaSpinner className="w-20 h-20 pText"></FaSpinner>
      </span>
      <p className="text-4xl pText">Loading...</p>
    </div>
  );
};

export default AuthLoading;
