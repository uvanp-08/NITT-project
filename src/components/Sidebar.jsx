import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout(); // ✅ updates context
      navigate("/login");
      onClose();
    }
  };

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
        <button onClick={handleLogout} className="logout" >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
