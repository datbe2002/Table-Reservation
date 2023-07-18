import { QRCode, Tag } from "antd";
import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReservationDetail = () => {
  const { _reservationId } = useParams();
  const [reservationArray, setReservation] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/reservation/detail/${_reservationId}`
        );
        setReservation(response.data);
        setCurrentStatus(response.data.reservation.status);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservation();
  }, [_reservationId]);

  if (!reservationArray) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="history-session">
        <div
          className="deltail-session"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px",
          }}
        >
          <div className="information" style={{ width: "70%" }}>
            <div>
              <h1 style={{ color: "black" }}>
                {reservationArray.reservation.username}
              </h1>
              <div className="field">
                <label className="label">Slot</label>
                <span className="value">
                  {reservationArray.reservation.slot}
                </span>
              </div>
              <div className="field">
                <label className="label">Position:</label>
                <span className="value">
                  {reservationArray.reservation.position}
                </span>
              </div>
              <div className="field">
                <label className="label">Date:</label>
                {console.log(reservationArray.reservation.dateTime)}
                <span className="value">
                  {format(
                    new Date(reservationArray.reservation.dateTime),
                    "dd/MM/yyyy HH:mm a"
                  )}
                </span>
              </div>
              <div className="field">
                <label className="label">Note:</label>
                <span className="value">
                  {reservationArray.reservation.note}
                </span>
              </div>
              <div className="field">
                <label className="label">Table:</label>
                <span className="value">
                  {reservationArray.reservation.table
                    ? reservationArray.reservation?.table.name
                    : "TBD"}
                </span>
              </div>
              <div className="field">
                <label className="label">Price:</label>
                <span className="value">
                  {reservationArray.reservation.price} VND
                </span>
              </div>
            </div>
          </div>
          <QRCode
            style={{ minWidth: "250px" }}
            value={`${window.location.origin}/reservation/${reservationArray?.reservation._id}`}
          />
        </div>
      </div>
    );
  }
};

export default ReservationDetail;
