// src/components/UserCard.js
import React from 'react';

// Random image selection from 1-10
const getRandomUserImage = () => {
  const imageId = Math.floor(Math.random() * 10) + 1;
  return `/images/user${imageId}.jpg`;
};

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img 
        src={getRandomUserImage()} 
        alt={user.username} 
        className="user-avatar"
      />
      <div className="user-info">
        <h3 className="user-name">{user.username}</h3>
        <div className="user-stats">
          <span className="stat-item">
            <strong>{user.postCount}</strong> posts
          </span>
          <span className="stat-item">
            <strong>{user.commentCount}</strong> comments
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

