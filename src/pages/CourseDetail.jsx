import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

const subjectDetails = {
  maths: {
    subject: "Maths",
    teacher: "Ms. Priya Sharma",
    designation: "Senior Mathematics Teacher",
    lessons: ["Algebra", "Geometry", "Trigonometry", "Statistics"],
    assignments: [
      {
        id: 1,
        name: "Algebra Worksheet",
        description: "Solve all equations from exercise 4B.",
        person: "PS",
      },
      {
        id: 2,
        name: "Geometry Basics",
        description: "Draw and label basic shapes with definitions.",
        person: "PS",
      },
    ],
  },
  english: {
    subject: "English",
    teacher: "Mr. Arjun Mehta",
    designation: "Language Specialist",
    lessons: ["Grammar", "Essay Writing", "Comprehension"],
    assignments: [],
  },
  physics: {
    subject: "Physics",
    teacher: "Dr. Ravi Kumar",
    designation: "Head of Physics Department",
    lessons: ["Kinematics", "Dynamics", "Thermodynamics"],
    assignments: [
      {
        id: 1,
        name: "Kinematics Problems",
        description: "Solve problems from chapter 2.",
        person: "RK",
      },
    ],
  },
  chemistry: {
    subject: "Chemistry",
    teacher: "Ms. Anjali Singh",
    designation: "Chemistry Teacher",
    lessons: ["Atomic Structure", "Chemical Reactions", "Organic Chemistry"],
    assignments: [
      {
        id: 1,
        name: "Chemical Reactions Lab Report",
        description: "Submit your lab report on chemical reactions.",
        person: "AS",
      },
    ],
  },
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const data = subjectDetails[courseId.toLowerCase()];

  if (!data) {
    return <div className="card">Subject not found.</div>;
  }

  return (
    <div>
      {/* Teacher Card */}
      <div
        className="card"
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <FaRegUser
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div>
            <h2 style={{ margin: "0" }}>{data.subject}</h2>
            <p style={{ margin: "4px 0", fontWeight: "bold" }}>{data.teacher}</p>
            <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
              {data.designation}
            </p>
          </div>
        </div>
        <button className="upload-btn">Join Class</button>
      </div>

      {/* Lessons List */}
      <div className="card">
        <h3>Lessons</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          {data.lessons.map((lesson, idx) => (
            <Link
              key={idx}
              to={`/lesson/${lesson.toLowerCase()}`} // ✅ Dynamic route to lesson
              className="card clickable-card"
              style={{
                flex: "1 1 150px",
                textAlign: "center",
                padding: "15px",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {lesson}
            </Link>
          ))}
        </div>
      </div>

      {/* Assignments Section */}
      <div>
        <h3 style={{ marginBottom: "10px" }}>Assignments</h3>
        {data.assignments.length > 0 ? (
          data.assignments.map((assignment) => (
            <div key={assignment.id} className="card assignment-card">
              <div className="assignment-header">
                <div className="person-icon">{assignment.person}</div>
                <div className="assignment-info">
                  <h3 className="assignment-name">{assignment.name}</h3>
                  <p className="assignment-description">
                    {assignment.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card" style={{ color: "#777" }}>
            No assignments posted yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
