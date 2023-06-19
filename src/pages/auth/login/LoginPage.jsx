import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="backgroundLogin">

      <div className="login">
        <form>
          <h2>Login</h2>
          <div className="inputBox">
            <input type="text" required placeholder="Email" />
          </div>
          <div className="inputBox">
            <input type="password" required placeholder="Password" />
          </div>
          <div className="inputBox">
            <input type="submit" value="Login" />
          </div>
          <p>
            Create new accout <Link to="/register">Register</Link>
          </p>
        </form>

      </div>
    </div>
  );
};

export default LoginPage;
