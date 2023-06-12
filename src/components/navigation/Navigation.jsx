import React from "react";
import "./navigation.scss";
import { Link } from "react-router-dom";

const Navigation = () => {
  const handleLogout = () => {
    console.log("Logout Click");
  };

  return (
    <div className="navigation">
      <Link to="/table-list">Browse</Link>
      <Link to="/my-history">History</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={handleLogout}>Logout</button>
      {/*       
      <button>Login</button>
      <button>Register</button> */}
    </div>
  );
};

export default Navigation;
