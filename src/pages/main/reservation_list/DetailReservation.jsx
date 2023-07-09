import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
      if (currentStatus !== "Cancelled") {
        fetchReservation();
      }
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
    <div>
      <h1>Reservation Detail</h1>
      <p>User: {reservationArray.reservation.user}</p>
      <p>Date: {reservationArray.reservation.dateTime}</p>
      <p>Position: {reservationArray.reservation.position}</p>
      <p>Status: {currentStatus}</p>
      <p>Note: {reservationArray.reservation.note}</p>
      <p>Table: {reservationArray.reservation.table?.name}</p>
      <p>Price: {reservationArray.reservation.price}</p>
      <div>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default DetailReservation;