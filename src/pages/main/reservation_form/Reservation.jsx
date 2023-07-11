import React, { useEffect } from "react";
import "./reservation.scss";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  QRCode,
  Radio,
  Row,
  Select,
  Space,
  Tabs,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fullResInfoSelector,
  reservationSelector,
  reservationTimeSelector,
} from "../../../redux/selector";
import {
  makeReservation,
  setReservation,
} from "../../../redux/slice/reservationSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const slotList = [2, 4, 6];
const positionList = [
  { value: "Outdoor", position: "Out door" },
  { value: "Inside", position: "Inside" },
  { value: "Upstair", position: "Upstair" },
];
const timeList = [
  { value: 1, time: "00.00 AM" },
  { value: 2, time: "00.01 AM" },
  { value: 3, time: "00.02 AM" },
  { value: 4, time: "00.03 PM" },
  { value: 5, time: "00.04 PM" },
];

const Reservation = () => {
  const { TextArea } = Input;
  const dateFormat = "DD/MM/YYYY";
  const timeformat = "HH:mm";
  // const dateFomat = { year: "numeric", month: "long", day: "numeric" };

  // redux
  const dispatch = useDispatch();
  const reservationObj = useSelector(reservationSelector);
  const user = useSelector((state) => state.auth.userDTO);
  const fullReservation = useSelector(fullResInfoSelector);
  // fullReservation.message = "a";
  // const timeList = useSelector(reservationTimeSelector);

  //
  const navigate = useNavigate();

  // local state
  const [open, setOpen] = useState(false);
  // payment type
  const [paymentType, setPaymentType] = useState("1");
  const paymentChange = (e) => {
    setPaymentType(e.target.value);
  };

  //
  const disabledDate = (current) => {
    // Can not select days before today
    return current && current < dayjs().startOf("day");
  };

  // handler
  const handleSubmit = (event) => {
    // dispatch(
    //   makeReservation({ reservation: reservationObj, userID: user._id })
    // );
    navigate(
      "../payment/" + fullReservation.reservation._id + "/" + paymentType
    );
  };

  useEffect(() => {
    if (fullReservation.message === "success" && !fullReservation.loading) {
      dispatch(setReservation({}));
      setOpen(true);
      console.log(fullReservation.message);
    }
  }, [fullReservation.loading]);

  const handleShowModal = (event) => {
    const obj = {
      noSlot: Number(event.noSlot),
      date: dayjs(event.date).format(dateFormat),
      time: dayjs(event.time).format(timeformat),
      position: event.position,
      note: event.note,
    };
    dispatch(setReservation(obj));
    dispatch(
      makeReservation({ reservation: reservationObj, userID: user._id })
    );
  };

  const handleCancel = () => {
    cancelOrder(fullReservation.reservation?._id);
    setOpen(false);
  };

  const cancelOrder = async (_reservationId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/manager/cancel/table/${_reservationId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  // component
  const paymentMethod = [
    {
      key: "1",
      label: `Banking`,
      children: `${fullReservation.reservation?.price}`,
    },
    {
      key: "2",
      label: `QR Pay`,
      children: (
        <>
          <div className="qr-payment">
            <QRCode value={"-"} />
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="reservation-container">
      <div className="reservation-top">
        <div className="reservation-top-text">Book a table now</div>
      </div>
      <Form
        className="reservation-form"
        name="reservation"
        initialValues={{}}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleShowModal}
      // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="noSlot"
          label="Number of seat:"
          rules={[{ required: true }]}
        >
          <Input type="Number" min={1}></Input>
        </Form.Item>

        <Form.Item label="Date" name="date" rules={[{ required: true }]}>
          <DatePicker disabledDate={disabledDate} format={dateFormat} />
        </Form.Item>

        <Form.Item name="time" label="Time:" rules={[{ required: true }]}>
          <TimePicker format={timeformat} />
        </Form.Item>

        <Form.Item
          name="position"
          label="Position:"
          rules={[{ required: true }]}
        >
          <Select
            placeholder=""
            // onChange={onGenderChange}
            allowClear
          >
            {positionList?.map((item, index) => (
              <Select.Option key={index} value={item.value}>
                {item.position}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Note:" name="note">
          <TextArea rows={4} />
        </Form.Item>

        <Row justify="center">
          <button type="submit" className="custom-btn">
            Make reservation
          </button>
        </Row>
      </Form>

      <Modal
        title="Your reservation infomation"
        open={open}
        onOk={handleSubmit}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        centered
        width={800}
        footer={[
          <div style={{ margin: "10px" }} key="payment">
            <p>Payment method</p>
            <Radio.Group value={paymentType} onChange={paymentChange}>
              <Radio.Button value="1">Type 1</Radio.Button>
              <Radio.Button value="2">Type 2</Radio.Button>
            </Radio.Group>
          </div>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Proceed to payment
          </Button>,
        ]}
      >
        <Divider />
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: "flex",
            padding: "10px 20px 10px 20px",
            fontSize: "16px",
          }}
        >
          <div className="detail-item">
            <div className="detail-content">
              <label>Table:</label>
              {fullReservation.reservation?.table.name}
            </div>
          </div>
          <div className="detail-item">
            <div className="detail-content">
              <label>Number of seat:</label>
              {fullReservation.reservation?.slot}
            </div>
          </div>
          <div className="detail-item">
            <div className="detail-content">
              <label>Date and time:</label>
              {fullReservation.reservation?.dateTime}
              {/* {new Date(fullReservation.reservation.date)} */}
            </div>
          </div>
          {/* <div className="detail-item">
            <div className="detail-content">
              <label>Time:</label>
              {fullReservation.reservation?.time}
            </div>
          </div> */}
          <div className="detail-item">
            <div className="detail-content">
              <label>Position:</label>
              {fullReservation.reservation?.position}
            </div>
          </div>
          <div className="detail-item">
            <div className="detail-content">
              <label>Note:</label>
              {fullReservation.reservation?.note}
            </div>
          </div>
        </Space>
        <Divider />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Reservation;
