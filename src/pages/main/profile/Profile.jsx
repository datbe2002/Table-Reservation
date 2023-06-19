import React, { useState, useEffect } from 'react';
import profileImage from './profileImage.png'; // Import the profile image file
import eyeIcon from '../profile/eye-slash-solid.svg'; // Import the eye icon file

import './Profile.css'; // Import the custom CSS file for styling

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('**********');
  const [showPassword, setShowPassword] = useState(false);
  const [editedPassword, setEditedPassword] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Fetch user attributes from the API and populate the fields
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Make an API request to fetch user data
      const response = await fetch('https://63692ab028cd16bba716cff0.mockapi.io/news/1');
      const userData = await response.json();

      // Populate the user attributes
      setName(userData.name);
      setEmail(userData.email);
      setPhone(userData.phone);
      setAddress(userData.address);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPassword(password); // Save the current password in case it gets modified
  };

  const handleSave = () => {
    setIsEditing(false);
    if (editedPassword !== '') {
      setPassword(editedPassword); // Update the password with the edited value
    }
    setEditedPassword(''); // Reset the edited password value
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPassword(''); // Reset the edited password value
  };

  const handlePasswordChange = (e) => {
    setEditedPassword(e.target.value); // Update the edited password value
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="user-profile">
      <h2>{name}'s Profile</h2>
      <div className="profile-image">
        <img src={profileImage} alt="Profile" />
      </div>
      <div className="profile-info">
        <div>
          <div className="field">
            <label className="label">Name:</label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <span className="value">{name}</span>
            )}
          </div>
          <div className="field">
            <label className="label">Email:</label>
            {isEditing ? (
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <span className="value">{email}</span>
            )}
          </div>
          <div className="field">
            <label className="label">Address:</label>
            {isEditing ? (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            ) : (
              <span className="value">{address}</span>
            )}
          </div>
        </div>
        <div>
          <div className="field">
            <label className="label">Password:</label>
            <div className="password-field">
              {isEditing ? (
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={editedPassword !== '' ? editedPassword : password}
                  onChange={handlePasswordChange}
                />
              ) : (
                <span className="value">**********</span>
              )}
              {isEditing && (
                <img
                  className="eye-icon"
                  src={eyeIcon}
                  alt="Toggle Password Visibility"
                  onClick={handleTogglePasswordVisibility}
                />
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">Phone:</label>
            {isEditing ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            ) : (
              <span className="value">{phone}</span>
            )}
          </div>
        </div>
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
  );
};

export default UserProfile;
