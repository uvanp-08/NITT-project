import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Game.css";

const QuizMe = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle");
  const [tries, setTries] = useState(0);
  const [loading, setLoading] = useState(true);

  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const res = await axios.get("https://opentdb.com/api.php?amount=10&type=multiple");
      const formatted = res.data.results.map((q) => {
        const options = [...q.incorrect_answers];
        const randomIndex = Math.floor(Math.random() * 4);
        options.splice(randomIndex, 0, q.correct_answer);
        return {
          question: decodeHTML(q.question),
          options: options.map(decodeHTML),
          answer: decodeHTML(q.correct_answer),
        };
      });
      setQuestions((prev) => [...prev, ...formatted]); // Append new questions
      setLoading(false);
    } catch (err) {
      console.error("Error loading quiz:", err);
    }
  };

  const decodeHTML = (str) =>
    str
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");

  const handleSelect = (option) => {
    if (status === "correct" || status === "showAnswer") return;

    setSelected(option);

    if (tries === 0) {
      setTotalAnswered((prev) => prev + 1); // Only first attempt
    }

    if (option === questions[currentQ].answer) {
      setStatus("correct");
      setCorrectCount((prev) => prev + 1);
      setTimeout(() => nextQuestion(), 2000);
    } else {
      setTries((prev) => prev + 1);
      if (tries >= 2) {
        setStatus("showAnswer");
        setTimeout(() => nextQuestion(), 2500);
      } else {
        setStatus("wrong");
      }
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setStatus("idle");
    setTries(0);

    if (currentQ + 1 >= questions.length - 3) {
      fetchQuiz(); // Load more questions if needed
    }

    setCurrentQ((prev) => prev + 1);
  };

  // Save result to backend when component unmounts
  useEffect(() => {
    return () => {
      axios
        .post("http://localhost:5000/api/quiz/save", {
          totalAnswered,
          correctCount,
        })
        .catch((err) => console.error("Error saving quiz stats", err));
    };
  }, [totalAnswered, correctCount]);

  if (loading && questions.length === 0)
    return <div className="card">Loading quiz...</div>;

  const question = questions[currentQ];

  return (
    <section>
      <div className="game-container">
        <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
        <h3 style={{fontSize: "2rem", margin:"1rem"}}>Quiz Me </h3>
        <p style={{fontWeight: "bolder"}}>{question.question}</p>
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
          <p className="feedback">
            The correct answer was <strong>{question.answer}</strong>. Let's keep going!
          </p>
        )}
        <div className="score" style={{ margin: "2rem" }}>
          <p>Total Answered: {totalAnswered}</p>
          <p>Correct Answers: {correctCount}</p>
        </div>
      </div>
    </section>
  );
};

export default QuizMe;
