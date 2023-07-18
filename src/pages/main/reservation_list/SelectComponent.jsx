import { Select } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateStatusV2 } from '../../../redux/slice/reservationSlice'

const SelectComponent = ({ reservation }) => {
    const [selectedValue, setSelectedValue] = useState(null);

    const loading = useSelector(state => state.reservation.loading)
    const dispatch = useDispatch()
    const reservationId = reservation._id;
    const currentValue = selectedValue || reservation.status;
    const handleChange = async (reservationId, e) => {
        dispatch(updateStatusV2({ reservationId, e, setSelectedValue }))
    };
    return (
        <Select
            value={currentValue}
            style={{ width: 120 }}
            loading={loading}
            onChange={(e) => handleChange(reservationId, e)}
            options={[
                { value: "Pending", label: "Pending" },
                { value: "Ongoing", label: "Ongoing" },
                { value: "Success", label: "Success" },
                { value: "Cancelled", label: "Cancelled" },
            ]}
        />
    )
}

export default SelectComponent