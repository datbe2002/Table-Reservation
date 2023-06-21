import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@gmail.com")) {
      setError("Email không hợp lệ");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu sai");
      return;
    }
    setError("");
    setLoading(true);

    const registerData = {
      username: username,
      phone: phone,
      password: password,
      email: email,
      address: address,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/customer/register",
        registerData
      );
      alert("Đăng ký thành công!");
      navigate("/login");
      setLoading(false);
    } catch (error) {
      alert("Đăng ký không thành công. Vui lòng thử lại.");
      setLoading(false);
    }
  };

  return (
    <div className="backgroundLogin">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h2>New Account</h2>
          <div className="inputBox">
            <input
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <input
              type="text"
              required
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            <input
              type="password"
              required
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
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
              type="text"
              required
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <input
              type="submit"
              value={loading ? "Creating..." : "Create"}
              disabled={loading}
            />
          </div>
          {error && <p className="errorMessage">{error}</p>}
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
