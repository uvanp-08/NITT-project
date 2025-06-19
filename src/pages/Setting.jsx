import React, { useState } from "react";
import "./Setting.css";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [profile, setProfile] = useState({ name: "", email: "" });

  const navigate = useNavigate();

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    alert("Settings saved!");
    // Add save logic here (e.g. API call)
  };

  return (
    <div className="settings-container">
      <h2>Settings ⚙️</h2>

      <div className="setting-section">
        <h4>👤 Profile</h4>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
          />
        </label>
        <label>
          Profile Picture:
          <input type="file" accept="image/*" />
        </label>
      </div>

      <div className="setting-section">
        <h4>🎨 Appearance</h4>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Enable Dark Mode
        </label>
      </div>

      <div className="setting-section">
        <h4>🔔 Notifications</h4>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          Receive Email Notifications
        </label>
      </div>

      <div className="setting-section">
        <h4>🔒 Account</h4>
        <button className="account-btn">Change Password</button>
        <button className="delete-btn">Delete Account</button>
      </div>

      <button className="save-btn" onClick={handleSave}>💾 Save Settings</button>
    </div>
  );
};

export default Setting;
