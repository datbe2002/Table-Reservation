import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Form, Row } from "antd";
import React, { useState } from "react";

export const PaymentForm = (props) => {
  let { url } = props;

  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [msg, setMsg] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: url,
      },

      redirect: "if_required",
    });
    if (error) {
      setMsg(error.message);
    }

    setIsProcessing(false);
  };
  return (
    <>
      <Form
        className=""
        name="payment"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleSubmit}
      >
        <PaymentElement />
        <Row justify="center">
          <button disabled={isProcessing} type="submit" className="custom-btn">
            {isProcessing ? "Processing" : "Pay now"}
          </button>
        </Row>
        {msg ? <div className="payment-bottom">{msg}</div> : ""}
      </Form>
    </>
  );
};
