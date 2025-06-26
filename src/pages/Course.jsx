import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Course = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("/api/courses")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  // temporary static chart data of same length
  const timeSpentData = courses.map(c => ({ course: c.subject, hours: Math.floor(Math.random()*10)+1 }));

  return (
    <div>
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
            <div key={c.slug} style={{ backgroundColor: "#eef2ff", padding: "10px 15px", borderRadius: 6 }}>
              <strong>{c.subject}:</strong> No updates yet.
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Available Courses</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 15 }}>
          {courses.map(c => (
            <div key={c.slug} className="card clickable-card" style={{ textAlign: "center", cursor: "pointer" }} onClick={() => navigate(`/course/${c.slug}`)}>
              <h4>{c.subject}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;
