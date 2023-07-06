import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Table } from "antd";
import CreateManager from "./CreateManager";
import UpdateManager from "./updateManager";

function Manager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [managers, setManagers] = useState([]);
  const [isManagerCreated, setIsManagerCreated] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenUpdateModal = (manager) => {
    setSelectedManager(manager);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedManager(null);
    setIsUpdateModalOpen(false);
  };

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/manager");
        const filteredManagers = response.data.allManager.filter(
          (manager) => manager.role === "Manager"
        );
        setManagers(filteredManagers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchManagers();
  }, [isManagerCreated]);

  const handleUpdate = (manager) => {
    handleOpenUpdateModal(manager);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button onClick={() => handleUpdate(record)}>Update</Button>
          <Button onClick={() => handleDelete(record)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h2>Tất cả người quản lý</h2>
      <Button className="create-btn" onClick={handleOpenModal}>
        Create new
      </Button>
      {isModalOpen && (
        <CreateManager
          closeModal={handleCloseModal}
          setIsManagerCreated={setIsManagerCreated}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateManager
          closeModal={handleCloseUpdateModal}
          setIsManagerUpdated={setIsManagerCreated}
          managerData={selectedManager}
        />
      )}
      <Table
        dataSource={managers.map((manager, index) => ({
          ...manager,
          key: index,
        }))}
        columns={columns}
        style={{ width: "1000px", height: "500px" }}
      />
    </div>
  );
}

export default Manager;
