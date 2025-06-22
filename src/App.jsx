import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Course from "./pages/Course";
import FocusTime from "./pages/Focustime";
import Breaktime from "./pages/BreakTime/Breaktime";
import Setting from "./pages/Setting";
import AssignmentDetail from "./pages/AssignmentDetail";
import CourseDetail from "./pages/CourseDetail";
import LessonDetail from "./pages/LessonDetail";

import TicTacToe from "./pages/BreakTime/TicTacToe";
import Sudoku from "./pages/BreakTime/sudoku";
import MemoryGame from "./pages/BreakTime/MemoryGame";
import QuizMe from "./pages/Breaktime/QuizMe";
import ReactionTimer from "./pages/Breaktime/ReactionTimer";
import TypingTest from "./pages/Breaktime/TypingTest";

import "./index.css";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      {isMobile && (
        <button className="sidebar-toggle-btn" onClick={() => setShowSidebar(!showSidebar)}>
          ☰
        </button>
      )}
      <div className={`main-container ${isMobile ? "mobile" : ""}`}>
        {(showSidebar || !isMobile) && (
          <Sidebar onClose={() => isMobile && setShowSidebar(false)} />
        )}
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course" element={<Course />} />
            <Route path="/FocusTime" element={<FocusTime />} />
            <Route path="/Breaktime" element={<Breaktime />} />
            <Route path="/breaktime/tictactoe" element={<TicTacToe />} />
            <Route path="/breaktime/sudoku" element={<Sudoku />} />
            <Route path="/breaktime/color-match" element={<MemoryGame />} />
            <Route path="/breaktime/quiz-me" element={<QuizMe />} />
            <Route path="/breaktime/reaction-timer" element={<ReactionTimer />} />
            <Route path="/breaktime/typing-test" element={<TypingTest />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/assignment/:id" element={<AssignmentDetail />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/lesson/:lessonId" element={<LessonDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
