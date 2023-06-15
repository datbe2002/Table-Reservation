import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="backgroundLogin">
      <div className="login">
        <form>
          <h2>New Account</h2>
          <div className="inputBox">
            <input type="text" required placeholder="Email" />
          </div>
          <div className="inputBox">
            <input type="password" required placeholder="Create Password" />
          </div>
          <div className="inputBox">
            <input type="password" required placeholder="Confirm Password" />
          </div>
          <div className="inputBox">
            <input type="submit" value="Create" />
          </div>
          <p>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
