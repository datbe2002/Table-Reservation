import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./DetailReservation.scss";
import { format } from "date-fns";
import { Tag } from "antd";

function DetailReservation() {
  const { _reservationId } = useParams();
  const [reservationArray, setReservation] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const nav = useNavigate()

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

  const tagColor = (s) => {
    let color = '';
    if (s === 'Success') {
      color = 'green';
    } else if (s === 'Cancelled') {
      color = 'red';
    } else if (s === 'Pending' || s === 'Ongoing') {
      color = 'yellow'
    }
    {
      return (<Tag color={color} key={s}>
        {s.toUpperCase()}
      </Tag>)
    }
  }

  if (!reservationArray) {
    return <div>Loading...</div>;
  }


  return (
    // <div className="reservation-detail">
    //   <h1>Reservation Detail</h1>

    //   <div className="detail-item">
    //     <span className="detail-label">User:</span>{" "}
    //     {reservationArray.reservation.user}
    //   </div>
    //   <div className="detail-item">
    //     <span className="detail-label">Date:</span>{" "}
    //     {reservationArray.reservation.dateTime}
    //   </div>
    //   <div className="detail-item">
    //     <span className="detail-label">Position:</span>{" "}
    //     {reservationArray.reservation.position}
    //   </div>
    //   <div className="detail-item">
    //     <span className="detail-label">Status:</span> {currentStatus}
    //   </div>
    //   <div className="detail-item">
    //     <span className="detail-label">Note:</span>{" "}
    //     {reservationArray.reservation.note}
    //   </div>
    //   <div className="detail-item">
    //     <span className="detail-label">Table:</span>{" "}
    //     {reservationArray.reservation.table?.name}
    //   </div>
    //   <div className="detail-item">
    //     <span className="detail-label">Price:</span>{" "}
    //     {reservationArray.reservation.price}
    //   </div>
    // </div>
    <div className='deltail-session' style={{ width: "60vw", marginTop: "20px", height: "69vh" }}>
      <div className='information'>
        <div>
          <h1 style={{ color: 'black' }}>{reservationArray.reservation.username}</h1>
          <div className="field">
            <label className="label">Slot</label>
            <span className="value">{reservationArray.reservation.slot}</span>
          </div>
          <div className="field">
            <label className="label">Position:</label>
            <span className="value">{reservationArray.reservation.position}</span>
          </div>
          <div className="field">
            <label className="label">Date:</label>
            <span className="value">{format((new Date(reservationArray.reservation.dateTime)), 'dd/MM/yyyy HH:mm')}</span>
          </div>
          <div className="field">
            <label className="label">Note:</label>
            <span className="value">{reservationArray.reservation.note}</span>
          </div>
          <div className="field">
            <label className="label">Table:</label>
            <span className="value">{reservationArray.reservation.table ? reservationArray.reservation?.table.name : 'TBD'}</span>
          </div>
          <div className="field">
            <label className="label">Price:</label>
            <span className="value">{reservationArray.reservation.price} VND</span>
          </div>
          <div className="field">
            <label className="label">Status:</label>
            <span className="value">
              {tagColor(reservationArray.reservation.status)}
            </span>
          </div>
        </div>
      </div>
      <button className='button-back' onClick={() => nav("/listReservation")}>Go back</button>
    </div>
  );
}

export default DetailReservation;