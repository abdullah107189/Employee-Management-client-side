import { NavLink, Outlet } from "react-router-dom";
import { LuSheet } from "react-icons/lu";
import { RiMenuUnfold3Fill } from "react-icons/ri";

const Dashboard = () => (
  <div className="max-w-[1440px] mx-auto">
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

        <ul className="menu min-h-full md:w-80  p-2 bg-[#142446] text-white">
          {/* Sidebar content here */}
          <a
            href="/"
            className="text-2xl flex items-center justify-center font-bold mb-6"
          >
            <span className="pText">As</span>Tech
          </a>
          <div className="w-full flex flex-col gap-2">
            <NavLink
              to="/dashboard/work-sheet"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "activeActionBtn !bg-[#678ce4] !text-white"
                    : "border    !text-white/80 hover:bg-transparent !border-white/80 actionBtn "
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
                    : "border    !text-white/80 hover:bg-transparent !border-white/80 actionBtn "
                } w-full`
              }
            >
              Payment History
            </NavLink>

            {/* HR  */}
            <NavLink
              to="/dashboard/employee-list"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "activeActionBtn !bg-[#678ce4] !text-white"
                    : "border    !text-white/80 hover:bg-transparent !border-white/80 actionBtn "
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
                    : "border    !text-white/80 hover:bg-transparent !border-white/80 actionBtn "
                } w-full`
              }
            >
              Employee Progress
            </NavLink>

            {/* ............admin .............. */}
            <NavLink
              to="/dashboard/payroll"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "activeActionBtn !bg-[#678ce4] !text-white"
                    : "border    !text-white/80 hover:bg-transparent !border-white/80 actionBtn "
                } w-full`
              }
            >
              Employee Payroll
            </NavLink>
          </div>
        </ul>
      </div>
    </div>
  </div>
);

export default Dashboard;
