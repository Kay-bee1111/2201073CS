// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Social Media Analytics</div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink 
            to="/top-users" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Top Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/trending" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Trending Posts
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/feed" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Feed
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;