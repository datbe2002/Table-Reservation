import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Typography  } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

function ListReservation() {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/reservation"
        );
        console.log(response.data); // In dữ liệu nhận được từ API vào console

        // Lấy phần "reservation" từ response và cập nhật state reservations
        setReservations(response.data.reservation);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const showDetailModal = (reservation) => {
    setSelectedReservation(reservation);
    setModalVisible(true);
  };

  const handleCancel = () => {
    // Xử lý logic khi nhấn nút "Cancel"
    setModalVisible(false);
  };

  const handleClear = () => {
    // Xử lý logic khi nhấn nút "Clear"
    setModalVisible(false);
  };

  const columns = [
    {
      title: "User",
      dataIndex: ["user", "username"],
      key: "user",
    },
    {
      title: "Date",
      dataIndex: "dateTime",
      key: "date",
    },
    {
      title: "Table",
      dataIndex: ["table", "name"],
      key: "table",
    },

    {
      title: "Actions",
      key: "actions",
      render: (text, reservation) => (
        <div>
           <Link to={`/reservation/detail/${reservation._id}`}>View Detail</Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>List Reservation</h1>
      <Table dataSource={reservations} columns={columns} rowKey="_id" />

      <Modal
        title="Reservation Detail"
        open={modalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="clear" type="primary" onClick={handleClear}>
            Clear
          </Button>,
        ]}
      >
        {selectedReservation && (
          <div>
            <p>User: {selectedReservation.user.username}</p>
            <p>Date: {selectedReservation.dateTime}</p>
            <p>Position: {selectedReservation.position}</p>
            <p>Status: {selectedReservation.status}</p>
            <p>Note: {selectedReservation.note}</p>
            <p>Table: {selectedReservation.table.name}</p>
            <p>Price: {selectedReservation.price}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ListReservation;
