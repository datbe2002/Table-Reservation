import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import axios from "axios";

function CreateManager({ closeModal, setIsManagerCreated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resetting previous errors
    setPasswordError("");
    setPhoneError("");
    setEmailError("");

    // Validation checks
    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters long.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Phone number should be a 10-digit number.");
      return;
    }

    if (!/^[^\s@]+@gmail\.com$/.test(email)) {
      setEmailError("Invalid email format. Please enter a Gmail address.");
      return;
    }

    const data = {
      username,
      password,
      email,
      phone,
      address,
      role: "Manager",
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/manager/create",
        data
      );
      console.log("Success:", response.data);
      closeModal();
      setIsManagerCreated((prevState) => !prevState);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal
      title="Create new manager"
      visible={true}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
    >
      <div>
        <h2>Create Manager</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <span style={{color:'red'}} className="error">{passwordError}</span>}
          </div>
          <div>
            <label>Email:</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <span style={{color:'red'}} className="error">{emailError}</span>}
          </div>
          <div>
            <label>Phone:</label>
            <Input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {phoneError && <span style={{color:'red'}} className="error">{phoneError}</span>}
          </div>
          <div>
            <label>Address:</label>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default CreateManager;
