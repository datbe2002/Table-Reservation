import React, { useState, useEffect } from 'react';
import profileImage from './profileImage.png';
import eyeIcon from '../profile/eye-slash-solid.svg';

import './Profile.css';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('**********');
  const [showPassword, setShowPassword] = useState(false);
  const [editedPassword, setEditedPassword] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://63692ab028cd16bba716cff0.mockapi.io/news');
      const userData = await response.json();
      const currentUser = userData[0]; 
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPhone(currentUser.phone);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const updateUserProfile = async () => {
    try {
      const response = await fetch(`https://63692ab028cd16bba716cff0.mockapi.io/news/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
        }),
      });
  
      if (response.ok) {
        console.log('User profile updated successfully!');
        fetchUserData(); 
      } else {
        console.error('Failed to update user profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };
  
  

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPassword(password);
  };
  const handleSave = () => {
    setIsEditing(false);
    if (editedPassword !== '') {
      setPassword(editedPassword);
    }
    setEditedPassword('');
    updateUserProfile();
  };
  

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPassword('');
  };

  const handlePasswordChange = (e) => {
    setEditedPassword(e.target.value);
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
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              <span className="value">{name}</span>
            )}
          </div>
          <div className="field">
            <label className="label">Email:</label>
            {isEditing ? (
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            ) : (
              <span className="value">{email}</span>
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
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
