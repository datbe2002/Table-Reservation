import React from "react";
import "./payment.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fullResInfoSelector,
  reservationSelector,
} from "../../../redux/selector";
import { Button, Divider, QRCode, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";

const path = "http://localhost:5173/reservation";

const ReservationDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reservationObj = useSelector(fullResInfoSelector);
  // console.log(reservationObj);

  const handleDone = () => {
    navigate("/");
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("myqrcode")?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      a.download = "QRCode.png";
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

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
      <div className="payment-top"></div>
      <div className="reservation-detail-container payment">
        <div className="text-info">
          <div className="detail-title">Your reservation infomation</div>
          <Divider />

          <div className="detail-item">
            <label>Number of seat:</label>
            <div className="detail-content">{reservationObj.noSlot}</div>
          </div>
          <div className="detail-item">
            <label>Date:</label>
            <div className="detail-content">
              {new Date(reservationObj.date).toLocaleDateString("en-US")}
            </div>
          </div>
          <div className="detail-item">
            <label>Time:</label>
            <div className="detail-content">{reservationObj.time}</div>
          </div>
          <div className="detail-item">
            <label>position</label>
            <div className="detail-content">{reservationObj.position}</div>
          </div>
          <div className="detail-item">
            <label>Note:</label>
            <div className="detail-content">{reservationObj.note}</div>
          </div>
        </div>
        <div className="qr-info">
          {/* output current qr {object Object} */}
          <QRCode size={250} value={path + reservationObj?._id} />
          <Button
            type="primary"
            shape="round"
            onClick={downloadQRCode}
            icon={<DownloadOutlined />}
            size="large"
          >
            Download
          </Button>
          {/* <Button type="primary" onClick={downloadQRCode}>
            Download
          </Button> */}
        </div>
      </div>
      <div className="payment-bottom">
        <div className="detail-title">Total</div>
        <div>total value goes here</div>
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

export default ReservationDetail;
