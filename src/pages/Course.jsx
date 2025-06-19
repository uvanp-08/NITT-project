import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const timeSpentData = [
  { course: "Maths", hours: 12 },
  { course: "English", hours: 8 },
  { course: "Physics", hours: 10 },
  { course: "Chemistry", hours: 9 },
  { course: "Biology", hours: 6 },
  { course: "History", hours: 7 },
  { course: "Geography", hours: 5 },
  { course: "Civics", hours: 4 },
  { course: "Tamil", hours: 5 },
  { course: "Hindi", hours: 3 },
  { course: "Computer Science", hours: 11 },
  { course: "AI", hours: 9 },
];

const courseList = [
  "Maths",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Civics",
  "Tamil",
  "Hindi",
  "Computer Science",
  "AI",
];

const courseActivities = {
  Maths: "Class on Algebra ongoing",
  English: "Essay assignment posted",
  Physics: "Test completed: 85%",
  Chemistry: "Lecture on Organic Compounds",
  Biology: "Class on Human Anatomy ongoing",
  History: "Test completed: 90%",
  Geography: "Assignment posted: Maps & Terrain",
  Civics: "Class on Constitution today",
  Tamil: "Poetry analysis lecture ongoing",
  Hindi: "Test scheduled for tomorrow",
  "Computer Science": "Live class on DSA",
  AI: "Assignment on Neural Networks posted",
};

const Course = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
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

        <div
          className="card hide-scroll"
          style={{
            flex: 1,
            maxHeight: "300px",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h3>Course Overview</h3>
          {Object.entries(courseActivities).map(([course, activity]) => (
            <div
              key={course}
              style={{
                backgroundColor: "#eef2ff",
                padding: "10px 15px",
                borderRadius: "6px",
              }}
            >
              <strong>{course}:</strong> {activity}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3>Available Courses</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "15px",
          }}
        >
          {courseList.map((course, idx) => (
            <div
              key={idx}
              className="card clickable-card"
              onClick={() => navigate(`/course/${course.toLowerCase().replace(/\s+/g, "-")}`)}
              style={{ textAlign: "center", cursor: "pointer" }}
            >
              <h4>{course}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;
