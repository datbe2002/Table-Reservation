import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerPassword } from '../../../redux/slice/authSlice';
import { ToastContainer } from 'react-toastify';

const ChangePassword = ({ setHandleOpenModal, id }) => {
    const message = useSelector(state => state.auth.error?.message)
    const [passwordTemp, setPasswordTemp] = useState('');
    const [passwordNewTemp, setPasswordNewTemp] = useState('');
    const [passwordReNewTemp, setPasswordReNewTemp] = useState('');
    const [currentPasswordError, setCurrError] = useState(message ? message : '');
    const [error, setError] = useState('');
    const [reerror, setReError] = useState('');
    const dispatch = useDispatch()


    const handleSavePassword = () => {
        if (passwordTemp.length < 5) {
            setCurrError('Passwords must be at least 5 characters')
            return
        }
        if (passwordNewTemp.length < 5) {
            setError('Passwords must be at least 5 characters')
            return
        }
        if (passwordReNewTemp.length < 5) {
            setReError('re Passwords must be at least 5 characters')
            return
        }
        if (passwordNewTemp !== passwordReNewTemp) {
            setReError('Passwords do not match')
            return
        }
        if (passwordTemp && passwordNewTemp) {
            dispatch(updateCustomerPassword({ passwordTemp, passwordNewTemp, id }))
        }
    }

    return (
        <div className='change-password-session'>
            <input type="text" placeholder='Type your current password' value={passwordTemp} onChange={(e) => setPasswordTemp(e.target.value)} onClick={() => setCurrError('')} />
            <div className='error-message'>{currentPasswordError}</div>

            <input type="text" placeholder='Type your new password' value={passwordNewTemp} onChange={(e) => setPasswordNewTemp(e.target.value)} onClick={() => setError('')} />
            <div className='error-message'>{error}</div>

            <input type="text" placeholder='Retype your new password' value={passwordReNewTemp} onChange={(e) => setPasswordReNewTemp(e.target.value)} onClick={() => setReError('')} />
            <div className='error-message'>{reerror}</div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px'
            }}>

                <button className='change-pass-button' onClick={handleSavePassword}>
                    Save
                </button>
                <button className='back-button' onClick={() => setHandleOpenModal(false)}>
                    -- Go back
                </button>
            </div>
            <ToastContainer />

        </div>
    )
}

export default ChangePassword