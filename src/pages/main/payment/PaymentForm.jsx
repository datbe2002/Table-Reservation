import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Form, Row } from "antd";
import React, { useState } from "react";

export const PaymentForm = (props) => {
  let { url, setOpen } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    console.log(e);
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
    } else {
      setOpen(true);
    }

    setIsProcessing(false);
  };
  return (
    <>
      <Form
        className="payment-form"
        name="payment"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onSubmitCapture={(e) => handleSubmit(e)}
      >
        <PaymentElement />
        <Row justify="center">
          <button disabled={isProcessing} type="submit" className="custom-btn">
            {isProcessing ? "Processing" : "Pay now"}
          </button>
        </Row>
        {msg ? <div className="payment-msg">{msg}</div> : ""}
      </Form>
    </>
  );
};
