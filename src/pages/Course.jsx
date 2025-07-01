import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { color } from "chart.js/helpers";

const Course = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("/api/courses")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  const timeSpentData = courses.map(c => ({ course: c.subject, hours: Math.floor(Math.random() * 10) + 1 }));

  // ✅ Hardcoded latest activity for each course
  const hardcodedActivity = {
    "data-structures": "📝 Last Assignment: Binary Trees Quiz",
    "algorithms": "📚 Last Lesson: Dynamic Programming Techniques",
    "computer-networks": "💬 Last Comment: 'Confused about TCP vs UDP'",
    "operating-systems": "📚 Last Lesson: Deadlock Prevention Strategies",
    "machine-learning": "📝 Last Assignment: Train Your Own Classifier",
    "artificial-intelligence": "📚 Last Lesson: Minimax Algorithm in Games"
  };

  return (
    <>
      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
        <div className="card" style={{ flex: 1 }}>
          <h3>Time Spent on Courses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={timeSpentData}>
              <XAxis dataKey="course" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#1a73e8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card hide-scroll" style={{ flex: 1, maxHeight: 350, overflowY: "scroll", display: "flex", flexDirection: "column", gap: 10 }}>
          <h3>Course Overview</h3>
          {courses.map(c => (
            <div
              key={c.slug}
              style={{
                backgroundColor: "#eef2ff",
                padding: "10px 15px",
                borderRadius: 6,
                color: "black"
              }}
            >
              <strong>{c.subject}:</strong> {hardcodedActivity[c.slug] || "No recent updates."}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Available Courses</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 15 }}>
          {courses.map(c => (
            <div
              key={c.slug}
              className="card clickable-card"
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => navigate(`/course/${c.slug}`)}
            >
              <h4>{c.subject}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Course;
