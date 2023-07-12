import React, { useEffect, useState } from "react";
import "./payment.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fullResInfoSelector,
  reservationSelector,
} from "../../../redux/selector";
import { Button, Divider, QRCode, Tabs } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";

const path = "http://localhost:5173/reservation";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reservationObj = useSelector(reservationSelector);
  const fullReservation = useSelector(fullResInfoSelector);
  const { _reservationId } = useParams();
  const [currentStatus, setCurrentStatus] = useState(null);
  // console.log(reservationObj);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/reservation/detail/${_reservationId}`
        );
        console.log(response.data);
        setCurrentStatus(response.data.reservation.status);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservation();
  }, [_reservationId]);

  const handleDone = () => {
    navigate("../reservation/detail/" + fullReservation.reservation._id);
  };

  // const downloadQRCode = () => {
  //   const canvas = document.getElementById("myqrcode")?.querySelector("canvas");
  //   if (canvas) {
  //     const url = canvas.toDataURL();
  //     const a = document.createElement("a");
  //     a.download = "QRCode.png";
  //     a.href = url;
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   }
  // };

  const paymentMethod = [
    {
      key: "1",
      label: `Banking`,
      children: (
        <>
          <div>STK</div>
          <div>MSG</div>
        </>
      ),
    },
    {
      key: "2",
      label: `QR Pay`,
      children: (
        <>
          <QRCode value={"aaa"} />
        </>
      ),
    },
  ];
  return (
    <div className="payment-container">
      <div className="payment-bottom">
        <div className="detail-title">Total</div>
        <div>{fullReservation.reservation?.price}</div>
        <Tabs defaultActiveKey="1" items={paymentMethod} />
        <Button
          style={{
            width: "220px",
            height: "45px",
            margin: "0 auto",
          }}
          type="primary"
          onClick={handleDone}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default Payment;
