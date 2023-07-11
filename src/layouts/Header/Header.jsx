import React from "react";
import Navigation from "../../components/navigation/Navigation";
import { useSelector } from "react-redux";

// const user = { id: 2, role: "user", name: "aaa" };
const Header = () => {
  // const { _id } = useSelector(state => state.auth.userDTO)
  return (
    <div className="header">
      <div className="logo">
        <img></img>
      </div>

      <Navigation />
    </div>
  );
};

export default Header;
