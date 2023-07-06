import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../redux/slice/authSlice";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(forgotPassword(email));
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="backgroundLogin">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h1>Forgot password</h1>
          <div className="inputBox">
            <input
              type="text"
              required
              placeholder="input your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <input type="submit" value="send email" />
          </div>
          Already have an account? <Link to="/login">Login</Link>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
