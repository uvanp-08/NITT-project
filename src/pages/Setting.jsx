import React, { useEffect, useState } from "react";
import "./Setting.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Setting = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // ✅ Get user info directly from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || "Guest";
  const userEmail = user?.email || "";

  useEffect(() => {
    // Optional: if you saved darkMode preference in localStorage or DB, load it here
    const fetchTheme = async () => {
      try {
        const res = await axios.get("/api/user/theme");
        setDarkMode(res.data.darkMode);
      } catch (err) {
        console.error("Failed to fetch theme", err);
      }
    };
    fetchTheme();
  }, []);

  // Apply the selected theme to the HTML root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    axios.post("/api/user/logout").finally(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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
        <p><strong>Name:</strong> {userName}</p>
        <p><strong>Email:</strong> {userEmail}</p>
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
      </div>
    </div>
  );
};

export default Setting;
