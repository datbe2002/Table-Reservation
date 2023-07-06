import React, { useState } from "react";
import { Modal } from 'antd';
import axios from "axios";

function CreateManager({ closeModal, setIsManagerCreated }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
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
          setIsManagerCreated(prevState => !prevState);
        } catch (error) {
          console.error("Error:", error);
        }
      };

  return (
    <Modal
      title="Create new manager"
      open={true}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
    >
       <div>
      <h2>Create Manager</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Create</button>
      </form>
    </div>
    </Modal>
  );
}

export default CreateManager;