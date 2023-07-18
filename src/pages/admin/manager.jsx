import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Table } from "antd";
import CreateManager from "./CreateManager";
import UpdateManager from "./updateManager";
import DeleteManager from "./DeleteManager";
import { useSelector } from "react-redux";
import "./styleManager.scss";
function Manager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [managers, setManagers] = useState([]);
  const [isManagerCreated, setIsManagerCreated] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteManagerId, setDeleteManagerId] = useState(null);

  const userDTO = useSelector((state) => state.auth.userDTO);
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

  const handleOpenDeleteModal = (managerId) => {
    setDeleteManagerId(managerId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedManager(null);
    setIsUpdateModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
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

  const handleDelete = (manager) => {
    handleOpenDeleteModal(manager._id);
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
          <Button className="update-btn" onClick={() => handleUpdate(record)}>Update</Button>
          <Button className="delete-btn" onClick={() => handleDelete(record)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="manager-container">
      <h2 className="title-manager">Tất cả người quản lý</h2>
      <Button className="create-btn" onClick={handleOpenModal}>
        +
      </Button>
      {isModalOpen && (
        <CreateManager
          closeModal={handleCloseModal}
          setIsManagerCreated={setIsManagerCreated}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteManager
          closeModal={handleCloseDeleteModal}
          managerId={deleteManagerId}
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
        style={{ width: "1000px", height: "300px" }}
        pagination={{
          pageSize: 2,
          itemRender: (page, type, originalElement) => {
            if (type === "page") {
              return <a className={page === 2 ? "active" : ""}>{page}</a>;
            }
            return originalElement;
          },
        }}
      />
    </div>
  );
}

export default Manager;
