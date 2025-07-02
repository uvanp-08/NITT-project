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
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import TicTacToe from "./pages/BreakTime/TicTacToe";
import Sudoku from "./pages/BreakTime/sudoku";
import MemoryGame from "./pages/BreakTime/MemoryGame";
import QuizMe from "./pages/BreakTime/quizMe";
import ReactionTimer from "./pages/BreakTime/ReactionTimer";
import TypingTest from "./pages/BreakTime/TypingTest";

import { useAuth } from "./context/AuthContext";
import "./index.css";

function App() {
  const { token } = useAuth();
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
      {token && isMobile && (
        <button className="sidebar-toggle-btn" onClick={() => setShowSidebar(!showSidebar)}>
          ☰
        </button>
      )}
      <div className={`main-container ${isMobile ? "mobile" : ""}`}>
        {token && (showSidebar || !isMobile) && (
          <Sidebar onClose={() => isMobile && setShowSidebar(false)} />
        )}
        <div className="content-area">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/course" element={<ProtectedRoute><Course /></ProtectedRoute>} />
            <Route path="/FocusTime" element={<ProtectedRoute><FocusTime /></ProtectedRoute>} />
            <Route path="/Breaktime" element={<ProtectedRoute><Breaktime /></ProtectedRoute>} />
            <Route path="/breaktime/tictactoe" element={<ProtectedRoute><TicTacToe /></ProtectedRoute>} />
            <Route path="/breaktime/sudoku" element={<ProtectedRoute><Sudoku /></ProtectedRoute>} />
            <Route path="/breaktime/MemoryGame" element={<ProtectedRoute><MemoryGame /></ProtectedRoute>} />
            <Route path="/breaktime/quiz-me" element={<ProtectedRoute><QuizMe /></ProtectedRoute>} />
            <Route path="/breaktime/reaction-timer" element={<ProtectedRoute><ReactionTimer /></ProtectedRoute>} />
            <Route path="/breaktime/typing-test" element={<ProtectedRoute><TypingTest /></ProtectedRoute>} />
            <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
            <Route path="/assignment/:id" element={<ProtectedRoute><AssignmentDetail /></ProtectedRoute>} />
            <Route path="/course/:courseId" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
            <Route path="/lesson/:lessonSlug" element={<ProtectedRoute><LessonDetail /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
