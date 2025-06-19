import React, { useState, useEffect, useRef } from "react";

function FocusTime() {
  const FOCUS_DURATION = 25 * 60; // 25 minutes
  const BREAK_DURATION = 5 * 60; // 5 minutes

  const [seconds, setSeconds] = useState(FOCUS_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [hearts, setHearts] = useState(3); // start with 3 hearts

  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (!isActive && timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  useEffect(() => {
    if (seconds < 0) {
      if (!isBreak) {
        setIsBreak(true);
        setSeconds(BREAK_DURATION);
        setHearts((prev) => prev + 1);
      } else {
        setIsBreak(false);
        setSeconds(FOCUS_DURATION);
      }
    }
  }, [seconds, isBreak]);

  const toggleTimer = () => {
    setIsActive((prev) => !prev);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setSeconds(FOCUS_DURATION);
    setHearts(3); // reset hearts to 3
  };

  // Remove a heart if stopped during break
  useEffect(() => {
    if (!isActive && isBreak) {
      setHearts((prev) => (prev > 0 ? prev - 1 : 0));
    }
  }, [isActive, isBreak]);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          marginBottom: 30,
          textAlign: "left",
        }}
      >
        <h2 style={{ margin: 0, marginBottom: 10 }}>📚 Get Ready to Focus!</h2>
        <p style={{ margin: 0, color: "#555" }}>
          "Success is the sum of small efforts repeated day in and day out."
        </p>
      </div>

      <div
        style={{
          fontSize: 140,
          fontWeight: "bold",
          background: "#fff",
          padding: "40px 0",
          borderRadius: 20,
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
          letterSpacing: 5,
          userSelect: "none",
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {formatTime(seconds)}
      </div>

      <div style={{ marginTop: 30 }}>
        <button
          onClick={toggleTimer}
          style={{
            fontSize: 18,
            padding: "12px 30px",
            marginRight: 15,
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor: "#1a73e8",
            color: "white",
          }}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          style={{
            fontSize: 18,
            padding: "12px 30px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor: "#999",
            color: "white",
          }}
        >
          Reset
        </button>
      </div>

      <div
        style={{
          marginTop: 40,
          fontSize: 36,
          color: "red",
          userSelect: "none",
          minHeight: 48,
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {[...Array(hearts)].map((_, i) => (
          <span key={i} role="img" aria-label="Pomodoro completed heart">
            ❤️
          </span>
        ))}
      </div>
    </div>
  );
}

export default FocusTime;
