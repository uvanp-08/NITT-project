import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ onClose }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>📘 Classroom</h1>
      </div>

      <nav>
        <NavLink to="/" onClick={onClose} className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
        <NavLink to="/course" onClick={onClose} className={({ isActive }) => (isActive ? "active" : "")}>Course</NavLink>
        <NavLink to="/FocusTime" onClick={onClose} className={({ isActive }) => (isActive ? "active" : "")}>Focus Time</NavLink>
        <NavLink to="/Breaktime" onClick={onClose} className={({ isActive }) => (isActive ? "active" : "")}>Break Time</NavLink>
        <NavLink to="/setting" onClick={onClose} className={({ isActive }) => (isActive ? "active" : "")}>Settings</NavLink>
        <a href="#" className="logout" onClick={onClose}>Logout</a>
      </nav>
    </div>
  );
};

export default Sidebar;
