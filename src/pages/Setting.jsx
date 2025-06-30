import React, { useEffect, useState } from "react";
import "./Setting.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Setting = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/profile");
        setProfile(res.data);
        setDarkMode(res.data.darkMode);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };
    fetchUser();
  }, []);

  // Apply the selected theme to the HTML root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    axios.post("/api/user/logout").finally(() => {
      navigate("/login");
    });
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const handleThemeToggle = async () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    try {
      await axios.put("/api/user/theme", { darkMode: newTheme });
    } catch (err) {
      console.error("Failed to update theme setting", err);
    }
  };

  return (
    <div className="settings-container">
      <h2>⚙️ Settings</h2>

      <div className="setting-section">
        <h4>👤 Profile Info</h4>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </div>

      <div className="setting-section">
        <h4>🎨 Appearance</h4>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleThemeToggle}
          />
          Enable Dark Mode
        </label>
      </div>

      <div className="setting-section">
        <h4>🔐 Account</h4>
        <button className="account-btn" onClick={handleChangePassword}>
          Change Password
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Setting;
