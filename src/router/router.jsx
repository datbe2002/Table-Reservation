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
import Payment from "../pages/main/payment/payment";
import ForgotPassword from "../pages/auth/login/ForgotPassword";
import PrivateRouteManager from "./privateRouteManager";
import ManagerPage from "../pages/admin/manager";
import ResetPassword from "../pages/auth/login/ResetPassword";
import ReservationDetail from "../pages/main/reservationdetal/ReservationDetail";
import ListReservation from "../pages/main/reservation_list/ListReservation";
import DetailReservation from "../pages/main/reservation_list/DetailReservation";

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
      path: "/forgotPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password/:token",
      element: <ResetPassword />,
    },
    {
      path: "/admin/login",
      element: <LoginAdmin />,
    },
    {
      path: "/listReservation",
      element: <ListReservation />,
    },
    {
      path: "/reservation/detail/:_reservationId",
      element: <DetailReservation />,
    },
    {
      element: <PrivateRouteManager />,
      children: [
        {
          path: "/pageManager",
          element: <ManagerPage />,
        },
      ],
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
