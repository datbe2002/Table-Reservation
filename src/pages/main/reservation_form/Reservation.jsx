import React from "react";
import "./reservation.scss";
import { DatePicker, Form, Input, Row, Select } from "antd";

const slotList = [2, 4, 6];
const positionList = [
  { value: 1, position: "Out door" },
  { value: 2, position: "Inside" },
  { value: 3, position: "Upstair" },
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

  const handleSubmit = (event) => {
    console.log("aaa");
  };

  return (
    <div className="reservation__container">
      <div className="reservation__top">
        <div className="reservation__top__text">Book a table now</div>
      </div>
      <Form
        className="reservation__form"
        name="reservation"
        initialValues={{}}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleSubmit}
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
          <DatePicker />
        </Form.Item>

        <Form.Item name="time" label="Time:" rules={[{ required: true }]}>
          <Select
            placeholder=""
            // onChange={onGenderChange}
            allowClear
          >
            {timeList?.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.time}
              </Option>
            ))}
          </Select>
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
              <Option key={index} value={item.value}>
                {item.position}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Note:">
          <TextArea rows={4} />
        </Form.Item>

        <Row justify="center">
          <button type="submit" className="custom__btn">
            Make reservation
          </button>
        </Row>
      </Form>
    </div>
  );
};

export default Reservation;
