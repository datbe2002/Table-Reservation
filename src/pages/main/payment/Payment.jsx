import React, { useEffect, useState } from "react";
import "./payment.scss";
import { useDispatch, useSelector } from "react-redux";
import { fullResInfoSelector } from "../../../redux/selector";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";

import { PaymentForm } from "./PaymentForm";
import { format } from "date-fns";
import { Button, Divider, Modal, QRCode, Space } from "antd";
import { resetFullreservation } from "../../../redux/slice/reservationSlice";

const Payment = () => {
  const fullReservation = useSelector(fullResInfoSelector);
  const { _reservationId } = useParams();

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  // local state
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(resetFullreservation());
    navigate("/");
  };
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/reservation/detail/${_reservationId}`
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservation();
  }, [_reservationId]);

  useEffect(() => {
    fetch("http://localhost:8000/api/payment/config").then(async (r) => {
      const { publisableKey } = await r.json();
      setStripePromise(loadStripe(publisableKey));
    });
  }, []);

  useEffect(() => {
    if (fullReservation?.reservation?.price) {
      const amount = fullReservation.reservation.price;
      fetch(
        `http://localhost:8000/api/payment/create-payment-intent/${amount}`,
        {
          method: "POST",
        }
      )
        .then(async (r) => {
          const { clientSecret } = await r.json();
          setClientSecret(clientSecret);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);
  return (
    <div className="payment-container">
      <div className="payment-info">
        <div className="information">
          <div>
            <h1 style={{ color: "black" }}>
              {fullReservation?.reservation?.username}
            </h1>
            <div className="field">
              <label className="label">Slot</label>
              <span className="value">
                {fullReservation?.reservation?.slot}
              </span>
            </div>
            <div className="field">
              <label className="label">Position:</label>
              <span className="value">
                {fullReservation?.reservation?.position}
              </span>
            </div>
            <div className="field">
              <label className="label">Date:</label>

              <span className="value">
                {fullReservation?.reservation?.dateTime
                  ? format(
                    new Date(fullReservation?.reservation?.dateTime),
                    "dd/MM/yyyy HH:mm a"
                  )
                  : ""}
              </span>
            </div>
            <div className="field">
              <label className="label">Note:</label>
              <span className="value">
                {fullReservation?.reservation?.note}
              </span>
            </div>
            <div className="field">
              <label className="label">Table:</label>
              <span className="value">
                {fullReservation?.reservation?.table
                  ? fullReservation?.reservation?.table.name
                  : "TBD"}
              </span>
            </div>
            <div className="field">
              <label className="label">Price:</label>
              <span className="value">
                {fullReservation?.reservation?.price} VND
              </span>
            </div>
          </div>
        </div>
      </div>
      {stripePromise && clientSecret && (
        <div className="payment-element">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm
              url={`${window.location.origin}/reservation/${fullReservation?.reservation?._id}`}
              setOpen={setOpen}
            />
          </Elements>
        </div>
      )}

      <Modal
        title="Payment success."
        open={open}
        // onOk={handleSubmit}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        centered
        width={350}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back
          </Button>,
        ]}
      >
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: "flex",
            padding: "10px 20px 10px 20px",
            fontSize: "16px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>QR code for your reservation detail!</div>
          <QRCode
            value={`${window.location.origin}/reservation/${fullReservation?.reservation?._id}`}
          />

          {/* <div className="detail-item">
            <div className="detail-content">
              <label>Table:</label>
              {fullReservation?.reservation?.table.name}
            </div>
          </div>
          <div className="detail-item">
            <div className="detail-content">
              <label>Number of seat:</label>
              {fullReservation?.reservation?.slot}
            </div>
          </div>
          <div className="detail-item">
            <div className="detail-content">
              <label>Date and time:</label>
              {fullReservation?.reservation?.dateTime
                ? format(
                    new Date(fullReservation?.reservation?.dateTime),
                    "dd/MM/yyyy HH:mm a"
                  )
                : ""}
            </div>
          </div>
          <div className="detail-item">
            <div className="detail-content">
              <label>Position:</label>
              {fullReservation?.reservation?.position}
            </div>
          </div>
          <div className="detail-item">
            <div className="detail-content">
              <label>Note:</label>
              {fullReservation?.reservation?.note}
            </div>
          </div>
          <div className="detail-item">
            <div className="detail-content">
              <label>Total:</label>
              {fullReservation?.reservation?.price} VNĐ
            </div>
          </div> */}
        </Space>
        <Divider />
      </Modal>
    </div>
  );
};

export default Payment;