import React, { useState } from "react";
import { Modal } from "antd";
import axios from "axios";

function UpdateManager({ closeModal, setIsManagerUpdated, managerData }) {
  const [username, setUsername] = useState(managerData.username);
  const [password, setPassword] = useState(managerData.password);
  const [phone, setPhone] = useState(managerData.phone);
  const [address, setAddress] = useState(managerData.address);
  const [email, setEmail] = useState(managerData.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(managerData);
    const data = {
      username,
      password,
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
      title="Update manager"
      open={true}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
    >
      <div>
        <h2>Update Manager</h2>
        <form onSubmit={handleSubmit}>
          {/* Update form content */}
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </Modal>
  );
}

export default UpdateManager;
