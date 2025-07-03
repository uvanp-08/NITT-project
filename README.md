# 🎓 NITT Study Platform

An interactive, full-stack educational web application built with **React**, **Express.js**, and **PostgreSQL** to enhance focused learning, assignment tracking, and lesson engagement — enriched with real-time usage analytics, focus timers, and gamified break-time features.

## 🚀 Features

- 🔐 **User Authentication** with JWT (login/logout flow)
- 📚 **Course Modules**: List, explore, and join various subjects
- 📝 **Assignments**: Submit and comment on subject-wise tasks
- 🎥 **Lessons**: Videos, materials, and test sections (fully trackable)
- 📊 **Usage Analytics**: View pie charts of video/material/test usage
- ⏱ **FocusTime**: Pomodoro-based focus timer with heart penalties for distraction
- 🕹 **BreakTime**: Brain-refreshing games like Sudoku, Quiz, Tic Tac Toe
- 🌙 **Dark Mode** toggle support
- 🎯 Responsive Design for desktop & mobile

## 🛠 Tech Stack

### Frontend:
- React.js (with React Router)
- Chart.js (for analytics)
- Axios
- Context API (Authentication)
- CSS modules + custom styles

### Backend:
- Node.js + Express.js
- PostgreSQL
- REST API endpoints
- CORS & JWT middleware

---

## 📁 Project Structure
/client → React frontend
├── /pages → Pages like Home, Course, LessonDetail, FocusTime, etc.
├── /components → Sidebar, ProtectedRoute, DarkModeToggle
├── /context → AuthContext.js
└── index.css → Global styling

/backend → Express + PostgreSQL backend
├── /routes → API endpoints for lessons, courses, assignments, usage, comments
├── /models → DB queries
├── db.js → DB connection config
└── server.js → Main server entry
