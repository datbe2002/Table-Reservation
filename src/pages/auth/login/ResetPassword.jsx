import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../../redux/slice/authSlice";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  const [password, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const resetData = {
      resetToken: token,
      password: password,
    };

    dispatch(updatePassword(resetData))
      .then(() => {
        console.log("Password updated successfully!");
      })
      .catch((error) => {
        console.error("Failed to update password. Please try again.", error);
      });
  };

  return (
    <div className="backgroundLogin">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <div className="inputBox">
            <input
              type="password"
              required
              placeholder="Input your new password"
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <input type="submit" value="Update Password" />
          </div>
          Already have an account? <Link to="/login">Login</Link>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;