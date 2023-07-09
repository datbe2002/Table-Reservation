import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      const loginData = {
        email: email,
        password: password,
      };
        dispatch(login({ loginData, navigate }));
    };

  return (
    <div className="backgroundLogin">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <div className="inputBox">
            <input
              type="text"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <input type="submit" value="Login" />
          </div>
          <p>
            Create new accout <Link to="/register">Register</Link>
          </p>
          <Link to="/forgotPassword">Forgot password</Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
export default LoginPage;
