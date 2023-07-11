import React, { useState, useEffect } from 'react';
import profileImage from './profileImage.png';
import eyeIcon from '../profile/eye-slash-solid.svg';

import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import ChangePassword from './ChangePassword';
import { updateCustomer } from '../../../redux/slice/authSlice';
import { ToastContainer } from 'react-toastify';
// import { fetchUserDataById } from '../../../redux/slice/authSlice';

const UserProfile = () => {

  const { _id, username, phone, email, address } = useSelector(state => state.auth.userDTO)

  const [isEditing, setIsEditing] = useState(false);
  const [usernameTemp, setNameTemp] = useState(username);
  const [emailTemp, setEmailTemp] = useState(email);
  const [phoneTemp, setPhoneTemp] = useState(phone ? phone : 'missing');
  const [addressTemp, setAddressTemp] = useState(address ? address : 'missing');
  const [handleOpenModal, setHandleOpenModal] = useState(false)
  const [error, setError] = useState('')
  const dispacth = useDispatch()


  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }
  const handleSave = () => {
    if (!usernameTemp || !emailTemp || !phoneTemp) {
      setError('Please provide information')
      return
    }
    if (!validateEmail(emailTemp)) {
      setError('Please provide a valid email')
      return
    }
    dispacth(updateCustomer({ username: usernameTemp, email: emailTemp, phone: phoneTemp, address: addressTemp, _id }))

    setIsEditing(false);
  };


  const handleEdit = () => {
    setIsEditing(true);
  };


  const handleCancel = () => {
    setError('')
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      {!handleOpenModal ?
        <>

          <h2>{username}'s Profile</h2>
          <div className="profile-image">
            <img src={profileImage} alt="Profile" />
          </div>
          <div className="profile-info">
            <div>
              <div className="field">
                <label className="label">Name:</label>
                {isEditing ? (
                  <input type="text" required value={usernameTemp} onChange={(e) => setNameTemp(e.target.value)} />
                ) : (
                  <span className="value">{username}</span>
                )}
              </div>
              <div className="field">
                <label className="label">Email:</label>
                {isEditing ? (
                  <input type="email" required value={emailTemp} onChange={(e) => setEmailTemp(e.target.value)} />
                ) : (
                  <span className="value">{email}</span>
                )}
              </div>
            </div>
            <div>
              <div className="field">
                {/* here */}
                <label className="label">Address:</label>
                {isEditing ? (
                  <input type="text" required value={addressTemp} onChange={(e) => setAddressTemp(e.target.value)} />
                ) : (
                  <span className="value">{address}</span>
                )}
              </div>
              <div className="field">
                <label className="label">Phone:</label>
                {isEditing ? (
                  <input type="text" required value={phoneTemp} onChange={(e) => setPhoneTemp(e.target.value)} />
                ) : (
                  <span className="value">{phone}</span>
                )}
              </div>
            </div>
            {isEditing && (<div className='error-message'>{error}</div>)}
            {!isEditing && (<div>
              <label style={{
                cursor: 'pointer',
                color: 'black',
              }} className="label" onClick={() => setHandleOpenModal(true)}>Change my password</label>

            </div>)}
          </div>
          {isEditing ? (
            <div className="button-group">
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
          )}
        </>
        :
        <ChangePassword setHandleOpenModal={setHandleOpenModal} id={_id} />
      }
      <ToastContainer />

    </div>


  );
};

export default UserProfile;
