import React, { useEffect, useState } from "react";
import "./navigation.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, logoutUser } from "../../redux/slice/authSlice";

const Navigation = () => {
  const { token } = useSelector((state) => state.auth);

  let element = [
    {
      path: "/reservation",
      name: "Reservation",
    },
    {
      path: "/my-history",
      name: "History",
    },
    {
      path: "/profile",
      name: "Profile",
    },
    {
      path: "/",
      name: "Logout",
    },
  ];

  const [active, setActive] = useState("");

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="navigation">
      {token ? (
        element.map((item, index) => (
          <Link
            key={index}
            to={item.name === "Profile" ? item.path : item.path}
            className={active === item.name ? "active" : ""}
            onClick={() => {
              item.name === "Logout" ? handleLogout() : setActive(item.name);
            }}
          >
            {item.name}
          </Link>
        ))
      ) : (
        <Link to={'/login'}>
          Login
        </Link>
      )}

    </div>
  );
};

export default Navigation;
