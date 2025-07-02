import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast requires both speed and accuracy.",
  "React is a popular JavaScript library for building interfaces.",
  "Stay calm and focused while typing your best.",
  "Practice every day to improve your typing speed.",
  "Artificial Intelligence is transforming the world rapidly.",
  "Keyboard shortcuts can improve productivity a lot.",
  "Persistence is the key to becoming a typing master.",
];

const TypingTest = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(60);
  const [typedWords, setTypedWords] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const inputRef = useRef();
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (timer === 0) clearInterval(intervalRef.current);
  }, [timer]);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (!startTime) {
      setStartTime(Date.now());
      startTimer();
    }

    const currentSentence = sentences[currentIndex];
    if (val.endsWith(" ") && val.trim() === currentSentence.trim()) {
      setTypedWords(prev => prev + val.trim().split(" ").length);
      setCorrectChars(prev => prev + currentSentence.length);
      setCurrentIndex((prev) => (prev + 1) % sentences.length);
      setInput("");
    } else {
      setInput(val);
    }
  };

  const getAccuracy = () => {
    const totalTypedChars = typedWords * 5; // avg 5 chars per word
    return totalTypedChars
      ? ((correctChars / totalTypedChars) * 100).toFixed(1)
      : "0.0";
  };

  const getWPM = () => {
    return typedWords;
  };

  const restart = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex(0);
    setInput("");
    setStartTime(null);
    setTimer(60);
    setTypedWords(0);
    setCorrectChars(0);
    inputRef.current.focus();
  };

  return (
    <div className="game-container">
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
      <h3>Typing Test ⌨️</h3>
      <p className="sample-text">{sentences[currentIndex]}</p>
      <textarea
        ref={inputRef}
        value={input}
        onChange={handleChange}
        className="typing-area"
        placeholder="Start typing..."
        disabled={timer === 0}
      />
      <p className="timer">⏱ Time Left: {timer}s</p>
      {timer === 0 && (
        <div className="result">
          <p><strong>WPM:</strong> {getWPM()}</p>
          <p><strong>Accuracy:</strong> {getAccuracy()}%</p>
        </div>
      )}
      <button onClick={restart} className="restart-btn">Restart</button>
    </div>
  );
};

export default TypingTest;
