import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/main/dashboard/Dashboard";
import Home from "../pages/landingPage/Home";
import TableList from "../pages/main/tablelist/TableList";
import Profile from "../pages/main/profile/Profile"

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
      path: "/",
      element: <Home />
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
          path: "/table-list",
          element: <TableList />,
        },
        {
          path: "/profile/:id",
          // element: <Dashboard />,
          element: <Profile />,
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
