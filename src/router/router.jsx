import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/main/dashboard/Dashboard";
import Home from "../pages/landingPage/Home";
// import TableList from "../pages/main/tablelist/TableList";
import LoginAdmin from "../pages/auth/LoginForManager/loginManager";
// import TableList from "../pages/main/reservation_form/Reservation";
import Profile from "../pages/main/profile/Profile";
import Reservation from "../pages/main/reservation_form/Reservation";
import ReservationDetail from "../pages/main/reservationdetal/ReservationDetail";

export default function Router() {
  const element = useRoutes([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/admin/login",
      element: <LoginAdmin />,
    },
    {
      element: <PrivateRoute />,
      children: [
        // dang nhap roi moi vo duoc trong nay
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        // view list
        {
          path: "/reservation",
          element: <Reservation />,
        },
        {
          path: "/reservation/:id",
          element: <ReservationDetail />,
        },
        {
          path: "/profile/:id",
          // element: <Dashboard />,
          element: <Profile />,
        },
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);
  const location = useLocation();

  if (!element) return null;
  return (
    <AnimatePresence mode="wait" initial={false}>
      {React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
}
