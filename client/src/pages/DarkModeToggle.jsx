import React from "react";
import useDarkMode from "../hooks/useDarkMode"; // adjust path as needed

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <button onClick={() => setDarkMode(!darkMode)} className="upload-btn">
      {darkMode ? "🌙 Dark Mode On" : "☀️ Light Mode"}
    </button>
  );
};

export default DarkModeToggle;
