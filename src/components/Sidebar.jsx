import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1>📘 Classroom</h1>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/course" className={({ isActive }) => isActive ? "active" : ""}>Course</NavLink>
        <NavLink to="/FocusTime" className={({ isActive }) => isActive ? "active" : ""}>Focus Time</NavLink>
        <NavLink to="/Breaktime" className={({ isActive }) => isActive ? "active" : ""}>Break Time</NavLink>
        <NavLink to="/setting" className={({ isActive }) => isActive ? "active" : ""}>Settings</NavLink>
        <a href="#" className="logout">Logout</a>
      </nav>
    </div>
  );
};

export default Sidebar;
