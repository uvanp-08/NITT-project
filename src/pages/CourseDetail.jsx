import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [comments, setComments] = useState({});

  const toSlug = (str) =>
    str.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await axios.get(`/api/courses/${courseId}`);
        const { course, assignments } = res.data;
        

        setCourse(course);
        setAssignments(assignments);

        // Fetch comments for each assignment
        assignments.forEach(async (assignment) => {
          try {
            const resComment = await axios.get(`/api/comments/${assignment.id}`);
            setComments((prev) => ({
              ...prev,
              [assignment.id]: resComment.data,
            }));
          } catch (err) {
            console.error("Error fetching comments for assignment:", assignment.id, err);
          }
        });
      } catch (err) {
        console.error("Error fetching course details:", err);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleInputChange = (id, value) => {
    setCommentInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitComment = async (assignmentId) => {
    const text = commentInputs[assignmentId]?.trim();
    if (!text) return;

    try {
      const res = await axios.post("/api/comments", {
        assignmentId,
        userName: "Yuva",
        text,
      });

      setComments((prev) => ({
        ...prev,
        [assignmentId]: [...(prev[assignmentId] || []), res.data],
      }));

      setCommentInputs((prev) => ({ ...prev, [assignmentId]: "" }));
    } catch (err) {
      console.error("Failed to submit comment:", err);
    }
  };

  if (!course) return <div className="card">Loading course...</div>;

  return (
    <div>
      {/* Course Header */}
      <div
        className="card"
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <FaRegUser style={{ width: 80, height: 80, borderRadius: "50%" }} />
          <div>
            <h2>{course.subject}</h2>
            <p style={{ fontWeight: "bold" }}>{course.teacher}</p>
            <p style={{ fontSize: 14, color: "#666" }}>{course.designation}</p>
          </div>
        </div>
        <button className="upload-btn">Join Class</button>
      </div>

      {/* Lessons */}
      <div className="card">
        <h3>Lessons</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 15,
            marginTop: 10,
          }}
        >
          {Array.isArray(course.lessons) && course.lessons.length > 0 ? (
            course.lessons.map((lesson, i) => (
              <Link
                key={i}
                to={`/lesson/${toSlug(lesson)}`}
                className="card clickable-card"
                style={{ flex: "1 1 150px", textAlign: "center" }}
              >
                {lesson}
              </Link>
            ))
          ) : (
            <div style={{ color: "#888" }}>No lessons available.</div>
          )}
        </div>
      </div>

      {/* Assignments */}
      <div>
        <h3>Assignments</h3>
        {assignments.length > 0 ? (
          assignments.map(({ id, name, description, person }) => (
            <div
              key={id}
              className="card assignment-card"
              style={{ cursor: "default" }}
            >
              {/* Assignment Link */}
              <Link
                to={`/assignment/${id}`}
                className="assignment-header clickable-card"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "15px",
                }}
              >
                <div className="person-icon">{person}</div>
                <div className="assignment-info">
                  <h3 className="assignment-name">{name}</h3>
                  <p className="assignment-description">{description}</p>
                </div>
              </Link>

              {/* Comment Box */}
              <div className="comment-form" style={{ marginTop: "10px" }}>
                <textarea
                  className="comment-input"
                  placeholder="Write a comment..."
                  value={commentInputs[id] || ""}
                  onChange={(e) => handleInputChange(id, e.target.value)}
                  rows={2}
                />
                <button
                  className="comment-submit-btn"
                  onClick={() => handleSubmitComment(id)}
                  disabled={!commentInputs[id]?.trim()}
                  style={{
                    opacity: commentInputs[id]?.trim() ? 1 : 0.6,
                    marginTop: "5px",
                  }}
                >
                  Post
                </button>
              </div>

              {/* Posted Comments */}
              {comments[id] && comments[id].length > 0 && (
                <div className="posted-comments" style={{ marginTop: "15px" }}>
                  <h4>Comments:</h4>
                  <ul>
                    {comments[id].map((comment, index) => (
                      <li key={index}>
                        <strong>{comment.user_name || comment.user}: </strong>
                        {comment.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="card" style={{ color: "#777" }}>
            No assignments yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
