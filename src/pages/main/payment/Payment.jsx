import React, { useEffect, useState } from "react";
import "./payment.scss";
import { useDispatch, useSelector } from "react-redux";
import { fullResInfoSelector } from "../../../redux/selector";

import { useParams } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";

import { PaymentForm } from "./PaymentForm";

const path = "http://localhost:5173/reservation";

const Payment = () => {
  const fullReservation = useSelector(fullResInfoSelector);
  const { _reservationId } = useParams();

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

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
      const data = { amount: fullReservation.reservation.price };
      console.log(data);
      fetch("http://localhost:8000/api/payment/create-payment-intent", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then(async (r) => {
          const { clientSecret } = await r.json();
          setClientSecret(clientSecret);
          console.log(r);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);
  return (
    <div className="payment-container">
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm
            url={`${window.location.origin}/detail/${fullReservation?.reservation._id}`}
          />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
