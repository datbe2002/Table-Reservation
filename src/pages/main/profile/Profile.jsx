import React, { useState } from 'react';
import profileImage from './profileImage.png'; // Import the profile image file

import './Profile.css'; // Import the custom CSS file for styling

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Huy depzai');
  const [email, setEmail] = useState('huydepzai@emdeplem.com');
  const [phone, setPhone] = useState('031231312312');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-info">
        <div className="profile-image">
          <img src={profileImage} alt="Profile" />
        </div>
        <div className="field">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <span>{name}</span>
          )}
        </div>
        <div className="field">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <span>{email}</span>
          )}
        </div>
        <div className="field">
          <label>Phone:</label>
          {isEditing ? (
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          ) : (
            <span>{phone}</span>
          )}
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
      </div>
    </div>
  );
};

export default UserProfile;
