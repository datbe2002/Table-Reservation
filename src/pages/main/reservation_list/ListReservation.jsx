import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Typography, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { updateStatusV2 } from "../../../redux/slice/reservationSlice";
import { ToastContainer } from "react-toastify";
import SelectComponent from "./SelectComponent";

function ListReservation() {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const loading = useSelector(state => state.reservation.loading)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/reservation"
        );

        // Lấy phần "reservation" từ response và cập nhật state reservations
        setReservations(response.data.reservation);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const dispatch = useDispatch();

  const handleChange = async (reservationId, e) => {
    dispatch(updateStatusV2({ reservationId, e, setSelectedValue }))
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
      sorter: (a, b) => a.user.username.length - b.user.username.length,
      sortDirections: ['ascend', 'descend', 'ascend']
    },
    {
      title: 'Date',
      dataIndex: 'dateTime',
      render: (day) => {
        return (
          <div>
            {format((new Date(day)), 'dd/MM/yyyy HH:mm a')}
          </div>
        )
      }
    },
    {
      title: 'Created date',
      dataIndex: 'createdAt',
      render: (day) => {
        return (
          <div>
            {format((new Date(day)), 'dd/MM/yyyy HH:mm a')}
          </div>
        )
      }

    },
    {
      title: "Table",
      dataIndex: ["table", "name"],
      key: "table",
    },

    {
      title: "Action",
      key: "action",
      render: (text, reservation) => {
        // const reservationId = reservation._id;
        // const currentValue = selectedValue || reservation.status;
        // console.log(loading)
        return (
          <SelectComponent reservation={reservation} />
        );
      },
    },
    {
      title: "View",
      key: "actions",
      render: (text, reservation) => (
        <div>
          <Link to={`/reservation/detail/${reservation._id}`}>View Detail</Link>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: "80vw", height: "72vh" }}>
      <h1 style={{ textAlign: 'center' }}>List Reservation</h1>
      <Table dataSource={reservations} columns={columns} rowKey="_id" style={{
        width: '100%'
      }} />

      <ToastContainer />
    </div>
  );
}

export default ListReservation;
