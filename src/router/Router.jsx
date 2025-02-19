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
import EmployeeRoute from "../route/EmployeeRoute";
import DetailsPage from "../Page/DetailsPage/DetailsPage";
import HRRoute from "../route/HRRoute";
import AdminRoute from "../route/AdminRoute";
import HRAndEmployeeDetailsPage from "../Page/HRAndEmployeeDetailsPage/HRAndEmployeeDetailsPage";
import ReceiveMassage from "../Page/Dashboard/Admin/ReceiveMassage/ReceiveMassage";
import ErrorPage from "../component/ErrorPage/ErrorPage";
import Profile from "../Page/Profile/Profile";
import Employee from "../Page/Dashboard/employee/Employee";
import HR from "../Page/Dashboard/HR/EmployeeList/HR";
import Admin from "../Page/Dashboard/Admin/Admin";

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
        path: "/contact-us",
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
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "work-sheet",
        element: (
          <EmployeeRoute>
            <WorkSheet></WorkSheet>
          </EmployeeRoute>
        ),
      },
      {
        path: "employee",
        element: (
          <EmployeeRoute>
            <Employee></Employee>
          </EmployeeRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <EmployeeRoute>
            <PaymentHistory></PaymentHistory>
          </EmployeeRoute>
        ),
      },
      {
        path: "employeeDetails/:id",
        element: (
          <PrivetRoute>
            <DetailsPage></DetailsPage>
          </PrivetRoute>
        ),
      },

      // HR dahsboard

      {
        path: "hr",
        element: (
          <HRRoute>
            <HR></HR>
          </HRRoute>
        ),
      },
      {
        path: "employee-list",
        element: (
          <HRRoute>
            <EmployeeList></EmployeeList>
          </HRRoute>
        ),
      },
      {
        path: "progress",
        element: (
          <HRRoute>
            <Progress></Progress>
          </HRRoute>
        ),
      },

      // admin
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Admin></Admin>
          </AdminRoute>
        ),
      },
      {
        path: "all-employee-list",
        element: (
          <AdminRoute>
            <AllEmployeeList></AllEmployeeList>
          </AdminRoute>
        ),
      },
      {
        path: "hrAndEmployeeDetails/:id",
        element: (
          <AdminRoute>
            <HRAndEmployeeDetailsPage></HRAndEmployeeDetailsPage>
          </AdminRoute>
        ),
      },
      {
        path: "payroll",
        element: (
          <AdminRoute>
            <PayRoll></PayRoll>
          </AdminRoute>
        ),
      },
      {
        path: "receiveMassage",
        element: (
          <AdminRoute>
            <ReceiveMassage></ReceiveMassage>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
export default Router;
