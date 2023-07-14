import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import axios from "axios";

function UpdateManager({ closeModal, setIsManagerUpdated, managerData }) {
  const [username, setUsername] = useState(managerData.username);
  const [phone, setPhone] = useState(managerData.phone);
  const [address, setAddress] = useState(managerData.address);
  const [email, setEmail] = useState(managerData.email);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resetting previous errors
    setPhoneError("");
    setEmailError("");

    // Validation checks

    if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Phone number should be 10 digits.");
      return;
    }

    if (!/^[^\s@]+@gmail\.com$/.test(email)) {
      setEmailError("Invalid email format. Please enter a Gmail address.");
      return;
    }

    const data = {
      username,
      email,
      phone,
      address,
      role: "Manager",
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/api/manager/update/${managerData._id}`,
        data
      );
      console.log("Success:", response.data);
      closeModal();
      setIsManagerUpdated((prevState) => !prevState);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal
      title="Update Manager"
      open={true}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
    >
      <div>
        <h2>Update Manager</h2>
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
              type="number"
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
            Update
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default UpdateManager;
