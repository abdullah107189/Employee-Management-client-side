import { NavLink, Outlet } from "react-router-dom";
import { LuSheet } from "react-icons/lu";
import { RiMenuUnfold3Fill } from "react-icons/ri";
import useCheckRole from "../../../hooks/useCheckRole";
import useAuth from "../../../hooks/useAuth";

const Dashboard = () => {
  const { user, logoutUser } = useAuth();
  const { checkRole } = useCheckRole();
  const hanldeLogOut = () => {
    logoutUser();
  };
  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          {/* Page content here */}
          <div className="drawer-button flex relative top-5 lg:hidden">
            <label htmlFor="my-drawer-2" className="activeActionBtn ml-auto">
              <RiMenuUnfold3Fill />
            </label>
          </div>
          <div className="m-2">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu min-h-full md:w-80  p-2 bg-[#142446] text-white relative">
            <p className="absolute top-2 left-10 z-10 text-green-500 bg-green-500/20 px-1 rounded-full font-semibold uppercase text-[10px]">
              {checkRole}
            </p>
            <img
              src={user?.photoURL}
              referrerPolicy="no-referrer"
              className="absolute w-10 h-10 top-3 left-2 rounded-full "
            />
            {/* Sidebar content here */}
            <a
              href="/"
              className="text-3xl flex items-center justify-center font-bold md:mb-10 mb-6"
            >
              <span className="pText">As</span>Tech
            </a>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "activeActionBtn !bg-[#678ce4] !text-white"
                    : "border    !text-white/80 mb-2  !border-white/30 hover:bg-white/10 actionBtn "
                } w-full flex items-center gap-2`
              }
            >
              <LuSheet /> Home
            </NavLink>

            <div className="w-full flex flex-col gap-2">
              {checkRole === "employee" && (
                <>
                  <NavLink
                    to="/dashboard/work-sheet"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "activeActionBtn !bg-[#678ce4] !text-white"
                          : "border    !text-white/80  !border-white/30 hover:bg-white/10 actionBtn "
                      } w-full flex items-center gap-2`
                    }
                  >
                    <LuSheet /> Work Sheet
                  </NavLink>

                  <NavLink
                    to="/dashboard/payment-history"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "activeActionBtn !bg-[#678ce4] !text-white"
                          : "border    !text-white/80  !border-white/30 hover:bg-white/10 actionBtn "
                      } w-full`
                    }
                  >
                    Payment History
                  </NavLink>
                </>
              )}

              {/* HR  */}
              {checkRole === "hr" && (
                <>
                  <NavLink
                    to="/dashboard/employee-list"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "activeActionBtn !bg-[#678ce4] !text-white"
                          : "border    !text-white/80  !border-white/30 hover:bg-white/10 actionBtn "
                      } w-full`
                    }
                  >
                    Employee List
                  </NavLink>

                  <NavLink
                    to="/dashboard/progress"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "activeActionBtn !bg-[#678ce4] !text-white"
                          : "border    !text-white/80  !border-white/30 hover:bg-white/10 actionBtn "
                      } w-full`
                    }
                  >
                    Employee Progress
                  </NavLink>
                </>
              )}

              {/* ............admin .............. */}
              {checkRole === "admin" && (
                <>
                  <NavLink
                    to="/dashboard/all-employee-list"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "activeActionBtn !bg-[#678ce4] !text-white"
                          : "border    !text-white/80  !border-white/30 hover:bg-white/10 actionBtn "
                      } w-full`
                    }
                  >
                    All Employee & HR List
                  </NavLink>

                  <NavLink
                    to="/dashboard/payroll"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "activeActionBtn !bg-[#678ce4] !text-white"
                          : "border    !text-white/80  !border-white/30 hover:bg-white/10 actionBtn "
                      } w-full`
                    }
                  >
                    Employee Payment Request
                  </NavLink>
                </>
              )}
            </div>
            <button
              onClick={hanldeLogOut}
              className="border !text-white/80 !border-white/30 hover:bg-white/10 actionBtn mt-auto mb-4"
            >
              Logout
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
