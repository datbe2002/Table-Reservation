import React, { useState } from "react";
import axios from "axios";
import "./loginManager.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginManager } from "../../../redux/slice/authSlice";

function LoginManager() {
  const [email, setEmailManager] = useState("");
  const [password, setPasswordManager] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginDataManager = {
      email: email,
      password: password,
    };
    dispatch(loginManager({ loginDataManager, navigate }));
  };

  return (
    <div className="loginManager">
      <div className="backgroundLoginManager">
        <form onSubmit={handleSubmit}>
          <h2 className="titleLogin">Login</h2>
          <div>
            <input
              className="formLoginManager"
              type="text"
              required
              placeholder="Username"
              value={email}
              onChange={(e) => setEmailManager(e.target.value)}
            />
          </div>
          <div>
            <input
              className="formLoginManager"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPasswordManager(e.target.value)}
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

export default LoginManager;
