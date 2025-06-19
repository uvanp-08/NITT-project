import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Madrid", "Rome"],
    answer: "Paris",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Dickens", "Tolstoy", "Hemingway"],
    answer: "Shakespeare",
  },
  {
    question: "What is 5 + 7?",
    options: ["10", "11", "12", "13"],
    answer: "12",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    answer: "100°C",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Pb", "Fe"],
    answer: "Au",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"],
    answer: "Da Vinci",
  },
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    answer: "Tokyo",
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
    answer: "Blue Whale",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    answer: "Diamond",
  },
];

const QuizMe = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle"); // idle, correct, wrong, showAnswer
  const [tries, setTries] = useState(0);

  const question = quizData[currentQ];

  const handleSelect = (option) => {
    if (status === "correct" || status === "showAnswer") return;
    setSelected(option);

    if (option === question.answer) {
      setStatus("correct");
      setTimeout(() => {
        nextQuestion();
      }, 2000);
    } else {
      setTries(prev => prev + 1);
      if (tries >= 2) {
        setStatus("showAnswer");
        setTimeout(() => {
          nextQuestion();
        }, 2500);
      } else {
        setStatus("wrong");
      }
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setStatus("idle");
    setTries(0);
    setCurrentQ((prev) => (prev + 1) % quizData.length);
  };

  return (
    <section>
      
      <div className="game-container">
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
      <h3>Quiz Me 🧠</h3>
      <p>{question.question}</p>
      <div className="quiz-options">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            className={`quiz-btn ${selected === option ? "selected" : ""} ${
              status === "showAnswer" && option === question.answer ? "correct" : ""
            }`}
            onClick={() => handleSelect(option)}
            disabled={status === "correct" || status === "showAnswer"}
          >
            {option}
          </button>
        ))}
      </div>

      {status === "correct" && <p className="feedback">✅ Correct! Great job!</p>}
      {status === "wrong" && <p className="feedback">❌ Oops! Try again! You got this 💪</p>}
      {status === "showAnswer" && (
        <p className="feedback">The correct answer was <strong>{question.answer}</strong>. Let's keep going!</p>
      )}
    </div>
    </section>
  );
};

export default QuizMe;
