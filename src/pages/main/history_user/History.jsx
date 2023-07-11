import React, { useEffect, useState } from 'react'
import './history.css'
import { Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getReservationByUser } from '../../../redux/slice/reservationSlice';
import { format } from 'date-fns';
import ReservationDetailUser from './ReservationDetailUser';


const History = () => {

    const { _id } = useSelector(state => state.auth.userDTO)

    const dispatch = useDispatch()

    const [openDetailComponent, setOpenDetailComponent] = useState(false)

    const [tempdata, setTempdata] = useState('')

    useEffect(() => {
        dispatch(getReservationByUser({ _id }))
    }, [])

    const data = useSelector(state => state.reservation?.myReservation)

    console.log(data)

    const transformedData = data.map((item) => {
        return {
            ...item,
            username: item.user.username
        };
    });

    const handleOpenIt = (r) => {
        setTempdata(r)
        setOpenDetailComponent(true)
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'username',
        },
        {
            title: 'Position',
            dataIndex: 'position',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (s) => {
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
        },
        {
            title: 'Created date',
            dataIndex: 'createdAt',
            render: (day) => {
                return (
                    <div>
                        {format((new Date(day)), 'dd/MM/yyyy')}
                    </div>
                )
            }
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
            render: (t, r) => <a onClick={() => handleOpenIt(r)}>Click to view more</a>,
        },
    ];
    return (
        <div className='history-session'>
            {!openDetailComponent ? (<><h1 className='title'>My reservation</h1>
                <Table columns={columns} dataSource={transformedData} style={{
                    width: '100%'
                }} /></>) : (
                <>
                    <h1 className='title'>Reservation detail</h1>
                    <ReservationDetailUser setOpenDetailComponent={setOpenDetailComponent} dataUser={tempdata} />
                </>
            )}
        </div>
    )
}

export default History