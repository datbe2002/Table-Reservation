import React from "react";
import "./reservation.scss";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  QRCode,
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
  const reservationId = useSelector(fullResInfoSelector).reservation._id;
  // const timeList = useSelector(reservationTimeSelector);

  //
  const navigate = useNavigate();

  // loacl state
  const [open, setOpen] = useState(false);

  //
  const disabledDate = (current) => {
    // Can not select days before today
    return current && current < dayjs().startOf("day");
  };

  // handler
  const handleSubmit = (event) => {
    dispatch(
      makeReservation({ reservation: reservationObj, userID: user._id })
    );
    navigate("../reservation/" + reservationId);
  };

  const handleShowModal = (event) => {
    // console.log(new Date(event.date).toJSON());
    const obj = {
      noSlot: Number(event.noSlot),
      date: dayjs(event.date).format(dateFormat),
      time: dayjs(event.time).format(timeformat),
      position: event.position,
    };

    dispatch(setReservation(obj));

    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // component
  const paymentMethod = [
    {
      key: "1",
      label: `Banking`,
      children: `Content of Tab Pane 1`,
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

        <Form.Item label="Note:">
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
          <Tabs defaultActiveKey="1" items={paymentMethod} />,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Done
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
              <label>Number of seat:</label>
              {reservationObj.noSlot}
            </div>
          </div>
          <div className="detail-item">
            <div className="detail-content">
              <label>Date:</label>
              {new Date(reservationObj.date).toLocaleDateString("en-US")}
            </div>
          </div>
          <div className="detail-item">
            <div className="detail-content">
              <label>Time:</label>
              {reservationObj.time}
            </div>
          </div>
          <div className="detail-item">
            <div className="detail-content">
              <label>Position:</label>
              {reservationObj.position}
            </div>
          </div>
          <div className="detail-item">
            <div className="detail-content">
              <label>Note:</label>
              {reservationObj.note}
            </div>
          </div>
        </Space>
        <Divider />
      </Modal>
    </div>
  );
};

export default Reservation;
