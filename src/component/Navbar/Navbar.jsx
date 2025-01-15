import { NavLink } from "react-router-dom";
import "./navbar.css";
import useAuth from "../../hooks/useAuth";
const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const li = (
    <div className="space-x-3">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${
            isActive
              ? "activeActionBtn !bg-[#678ce4] !text-white"
              : "border !text-white/80 hover:bg-transparent !border-white/80 actionBtn"
          }`
        }
      >
        Home
      </NavLink>
      {user && (
        <NavLink
          to="/dashboard/work-sheet"
          className={({ isActive }) =>
            `${
              isActive
                ? "activeActionBtn !bg-[#678ce4] !text-white"
                : "border   !text-white/80 hover:bg-transparent !border-white/80 actionBtn"
            }`
          }
        >
          DashBoard
        </NavLink>
      )}
      <NavLink
        to="/contact-us"
        className={({ isActive }) =>
          `${
            isActive
              ? "activeActionBtn !bg-[#678ce4] !text-white"
              : "border   !text-white/80 hover:bg-transparent !border-white/80 actionBtn"
          }`
        }
      >
        Contact Us
      </NavLink>
    </div>
  );
  const handleLogout = () => {
    logoutUser();
  };
  return (
    <div className="bg-[#142446] sticky top-0 z-50">
      <div className="navbar py-0 text-white mxw">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {li}
            </ul>
          </div>
          <a href="/" className="text-2xl font-bold">
            <span className="pText">As</span>Tech
          </a>
        </div>
        <div className="navbar-center  hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{li}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end text-black">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10   rounded-full">
                  <img
                    className="hover:border-2 border-[#678ce4] transform duration-100 rounded-full"
                    alt={user?.displayName}
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "activeActionBtn !bg-[#678ce4] !text-white"
                      : "border    !text-white/80 hover:bg-transparent !border-white/80 actionBtn"
                  } mr-3`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "activeActionBtn !bg-[#678ce4] !text-white"
                      : "border !text-white/80 hover:bg-transparent !border-white/80 actionBtn"
                  } actionBtn`
                }
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
