import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Page/Home/Home/Home";
import Login from "../Page/Home/Auth/Login/Login";
import Register from "../Page/Home/Auth/Register/Register";
import Dashboard from "../Page/Dashboard/Dashboard/Dashboard";
import WorkSheet from "../Page/Dashboard/employee/WorkSheet/WorkSheet";
import PaymentHistory from "../Page/Dashboard/employee/PaymentHistory/PaymentHistory";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'work-sheet',
                element: <WorkSheet></WorkSheet>
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            },

        ]
    }
]);
export default Router