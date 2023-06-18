import React, { useState } from "react";
import "./navigation.scss";
import { Link } from "react-router-dom";

const element = [
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
    path: "/login",
    name: "Logout",
  },
];

const Navigation = (props) => {
  const [active, setActive] = useState("");
  const { userID } = props;

  const handleLogout = () => {
    console.log("Logout Click");
  };

  return (
    <div className="navigation">
      {element.map((item, index) => (
        <Link
          key={index}
          to={item.name === "Profile" ? item.path + `/${userID}` : item.path}
          className={active === item.name ? "active" : ""}
          onClick={() => {
            item.name === "Logout" ? handleLogout() : setActive(item.name);
          }}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
