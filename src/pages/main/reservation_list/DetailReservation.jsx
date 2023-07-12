import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./DetailReservation.scss";

function DetailReservation() {
  const { _reservationId } = useParams();
  const [reservationArray, setReservation] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/reservation/detail/${_reservationId}`);
        console.log(response.data); 
        setReservation(response.data);
        setCurrentStatus(response.data.reservation.status);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservation();
  }, [_reservationId]);

  const handleClear = async () => {
    try {
      await axios.post(`http://localhost:8000/api/manager/clear/table/${_reservationId}`);
      console.log('Table cleared successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async () => {
    try {
      await axios.post(`http://localhost:8000/api/manager/cancel/table/${_reservationId}`);
      console.log('Reservation cancelled successfully');
      setCurrentStatus("Cancelled");
    } catch (error) {
      console.error(error);
    }
  };

  if (!reservationArray) {
    return <div>Loading...</div>;
  }

  return (
    <div className="reservation-detail">
      <h1>Reservation Detail</h1>

      <div className="detail-item">
        <span className="detail-label">User:</span>{" "}
        {reservationArray.reservation.user}
      </div>
      <div className="detail-item">
        <span className="detail-label">Date:</span>{" "}
        {reservationArray.reservation.dateTime}
      </div>
      <div className="detail-item">
        <span className="detail-label">Position:</span>{" "}
        {reservationArray.reservation.position}
      </div>
      <div className="detail-item">
        <span className="detail-label">Status:</span> {currentStatus}
      </div>
      <div className="detail-item">
        <span className="detail-label">Note:</span>{" "}
        {reservationArray.reservation.note}
      </div>
      <div className="detail-item">
        <span className="detail-label">Table:</span>{" "}
        {reservationArray.reservation.table?.name}
      </div>
      <div className="detail-item">
        <span className="detail-label">Price:</span>{" "}
        {reservationArray.reservation.price}
      </div>
      <div className="button-group">
        <button className="clear-button" onClick={handleClear}>
          Clear
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DetailReservation;