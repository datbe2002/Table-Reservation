import React, { useEffect, useState } from "react";
import "./navigation.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, logoutUser } from "../../redux/slice/authSlice";

const Navigation = () => {
  const { token } = useSelector((state) => state.auth);
  const { role } = useSelector((state) => state.auth.userDTO);
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
      {token && !role
        ? element.map((item, index) => (
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
        : null}
      {role && token ? (
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      ) : null}
      {!role && !token ? <Link to="/login">Login</Link> : null}
    </div>
  );
};

export default Navigation;
