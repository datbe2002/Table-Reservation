import React from "react";
import Navigation from "../../components/navigation/Navigation";

const user = { id: 2, role: "user", name: "aaa" };
const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img></img>
      </div>

      <Navigation userID={user.id} />
    </div>
  );
};

export default Header;
