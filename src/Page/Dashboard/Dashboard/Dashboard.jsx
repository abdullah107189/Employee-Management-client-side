import { NavLink, Outlet } from "react-router-dom";
import { LuSheet } from "react-icons/lu";

const Dashboard = () => {
    return (
        <div className="mxw grid grid-cols-6 h-screen">
            {/* left side  */}
            <div className="col-span-1 p-2 bg-[#142446] text-white">
                <a href="/" className="text-2xl flex items-center justify-center font-bold mb-6"><span className="pText">As</span>Tech</a>
                <div className="w-full flex flex-col gap-2">
                    <NavLink to="/dashboard/work-sheet" className={({ isActive }) => (`${isActive ? "activeActionBtn !bg-[#678ce4] !text-white" : "border    !text-white/80 hover:bg-transparent !border-white/80 actionBtn "} w-full flex items-center gap-2`)}><LuSheet /> Work Sheet</NavLink>

                    <NavLink to="/dashboard/payment-history" className={({ isActive }) => (`${isActive ? "activeActionBtn !bg-[#678ce4] !text-white" : "border    !text-white/80 hover:bg-transparent !border-white/80 actionBtn "} w-full`)}>Payment History</NavLink>
                </div>
            </div>
            {/* right side  */}
            <div className="col-span-5 m-2">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;