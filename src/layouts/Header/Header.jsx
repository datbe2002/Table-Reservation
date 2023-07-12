import React from "react";
import Navigation from "../../components/navigation/Navigation";
import { useSelector } from "react-redux";

// const user = { id: 2, role: "user", name: "aaa" };
const Header = () => {
  const user = useSelector((state) => state.auth.userDTO);
  return (
    <div className="header">
      <div className="logo">
        <div className="logo-name">SAVORY BITE</div>
        <div className="logo-slogan">Buon appetito!</div>
      </div>

      <Navigation userID={user._id} />
    </div>
  );
};

export default Header;
