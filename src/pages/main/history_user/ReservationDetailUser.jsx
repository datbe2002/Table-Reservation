import { Tag } from 'antd'
import { format } from 'date-fns'
import React from 'react'

const ReservationDetailUser = ({ setOpenDetailComponent, dataUser }) => {
    console.log(dataUser)

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

    return (
        <div className='deltail-session'>
            <div className='information'>
                <div>
                    <h1 style={{ color: 'black' }}>{dataUser.username}</h1>
                    <div className="field">
                        <label className="label">Slot</label>
                        <span className="value">{dataUser.slot}</span>
                    </div>
                    <div className="field">
                        <label className="label">Position:</label>
                        <span className="value">{dataUser.position}</span>
                    </div>
                    <div className="field">
                        <label className="label">Date:</label>
                        <span className="value">{format((new Date(dataUser.dateTime)), 'dd/MM/yyyy HH:mm')}</span>
                    </div>
                    <div className="field">
                        <label className="label">Note:</label>
                        <span className="value">{dataUser.note}</span>
                    </div>
                    <div className="field">
                        <label className="label">Table:</label>
                        <span className="value">{dataUser.table ? dataUser?.table.name : 'TBD'}</span>
                    </div>
                    <div className="field">
                        <label className="label">Price:</label>
                        <span className="value">{dataUser.price} VND</span>
                    </div>
                    <div className="field">
                        <label className="label">Status:</label>
                        <span className="value">
                            {tagColor(dataUser.status)}
                        </span>
                    </div>
                </div>
            </div>
            <button className='button-back' onClick={() => setOpenDetailComponent(false)}>Go back</button>
        </div>
    )
}

export default ReservationDetailUser