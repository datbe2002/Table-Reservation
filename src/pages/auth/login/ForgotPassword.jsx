import React from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="backgroundLogin">
      <div className="login">
        <form>
          <h1>Forgot password</h1>
          <div className="inputBox">
            <input type="text" required placeholder="input your email" />
          </div>
          <div className="inputBox">
            <input type="submit" value="send email"/>
          </div>
          Already have an account? <Link to="/login">Login</Link>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
