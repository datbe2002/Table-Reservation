import React from "react";
import "./loginManager.scss";
function loginManager() {
  return (
    <div className="loginManager">
      <div className="backgroundLoginManager">
        <form>
          <h2 className="titleLogin">Login</h2>
          <div>
            <input
              className="formLoginManager"
              type="text"
              required
              placeholder="Username"
            />
          </div>
          <div>
            <input
              className="formLoginManager"
              type="password"
              required
              placeholder="Password"
            />
          </div>
          <div className="btnLoginManager">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default loginManager;
