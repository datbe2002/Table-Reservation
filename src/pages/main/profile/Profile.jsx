import React from 'react';
import './Profile.css'; // Import the custom CSS file for styling

// const UserProfile = ({ userID, name, email, password, phone, role, status }) => {
    const UserProfile = () => {

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-info">
        <div className="field">
          <label>User ID:</label>
          <span>ID12321</span>
        </div>
        <div className="field">
          <label>Name:</label>
          <span>Huy depzai</span>
        </div>
        <div className="field">
          <label>Email:</label>
          <span>huydepzai@emdeplem.com</span>
        </div>
        <div className="field">
          <label>Password:</label>
          <span>**********</span>
        </div>
        <div className="field">
          <label>Phone:</label>
          <span>031231312312</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
