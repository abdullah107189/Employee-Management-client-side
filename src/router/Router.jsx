import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Page/Home/Home/Home";
import Login from "../Page/Home/Auth/Login/Login";
import Register from "../Page/Home/Auth/Register/Register";
import Dashboard from "../Page/Dashboard/Dashboard/Dashboard";
import WorkSheet from "../Page/Dashboard/employee/WorkSheet/WorkSheet";
import PaymentHistory from "../Page/Dashboard/employee/PaymentHistory/PaymentHistory";
import Contact from "../Page/Contact/Contact";
import EmployeeList from "../Page/Dashboard/HR/EmployeeList/EmployeeList";
import Progress from "../Page/Dashboard/Admin/Progress/Progress";
import PrivetRoute from "../route/PrivetRoute";
import PayRoll from "../Page/Dashboard/Admin/PayRoll/PayRoll";
import AllEmployeeList from "../Page/Dashboard/Admin/AllEmployeeList/AllEmployeeList";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <Dashboard></Dashboard>
      </PrivetRoute>
    ),
    children: [
      {
        path: "work-sheet",
        element: <WorkSheet></WorkSheet>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },

      // HR dahsboard
      {
        path: "employee-list",
        element: <EmployeeList></EmployeeList>,
      },
      {
        path: "progress",
        element: <Progress></Progress>,
      },

      // admin
      {
        path: "all-employee-list",
        element: <AllEmployeeList></AllEmployeeList>,
      },
      {
        path: "payroll",
        element: <PayRoll></PayRoll>,
      },
    ],
  },
]);
export default Router;
