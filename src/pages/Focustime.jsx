import React, { useState, useEffect, useRef } from "react";

function FocusTime() {
  const FOCUS_DURATION = 25 * 60;
  const BREAK_DURATION = 5 * 60;

  const [seconds, setSeconds] = useState(FOCUS_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [hearts, setHearts] = useState(3);

  const timerRef = useRef(null);
  const containerRef = useRef(null);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
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

  // Switch tab = pause only during focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!isBreak && document.hidden && isActive) {
        setIsActive(false);
        reduceHeart();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isActive, isBreak]);

  // Outside click = pause only during focus
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isActive &&
        !isBreak &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setIsActive(false);
        reduceHeart();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isActive, isBreak]);

  useEffect(() => {
    if (hearts === 0) {
      setTimeout(() => {
        setIsBreak(false);
        setIsActive(true);
        setHearts(3);
        setSeconds(FOCUS_DURATION);
      }, 1000);
    }
  }, [hearts]);

  const reduceHeart = () => {
    if (hearts > 0) setHearts((prev) => prev - 1);
  };

  const toggleTimer = () => setIsActive((prev) => !prev);

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setSeconds(FOCUS_DURATION);
    setHearts(3);
  };

  return (
    <div
      ref={containerRef}
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
        <h2>📚 Get Ready to Focus!</h2>
        <p style={{ color: "#555" }}>
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
      >
        {[...Array(hearts)].map((_, i) => (
          <span key={i} role="img" aria-label="heart">
            ❤️
          </span>
        ))}
      </div>
    </div>
  );
}

export default FocusTime;
