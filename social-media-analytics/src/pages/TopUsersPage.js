// src/pages/TopUsersPage.js
import React, { useState, useEffect } from 'react';
import { getTopUsers } from '../services/api';
import UserCard from '../components/UserCard';

const TopUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        setLoading(true);
        const data = await getTopUsers();
        // Sort users by post count in descending order
        const sortedUsers = [...data].sort((a, b) => b.postCount - a.postCount);
        // Get top 5 users
        setUsers(sortedUsers.slice(0, 5));
        setLoading(false);
      } catch (err) {
        setError('Failed to load top users');
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  if (loading) return <div className="loading">Loading top users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Top Users</h1>
      <div className="users-container">
        {users.length > 0 ? (
          users.map(user => <UserCard key={user.id} user={user} />)
        ) : (
          <p className="no-data">No users found</p>
        )}
      </div>
    </div>
  );
};

export default TopUsersPage;