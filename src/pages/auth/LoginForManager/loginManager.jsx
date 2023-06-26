import React, { useState } from "react";
import axios from "axios";
import "./loginManager.scss";

function LoginManager() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/manager/login",
        data
      );
      // Xử lý phản hồi thành công ở đây
      console.log(response.data);
    } catch (error) {
      // Xử lý lỗi ở đây
      console.error(error);
    }
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
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <input
              className="formLoginManager"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
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
