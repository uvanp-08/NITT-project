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

  useEffect(() => {
    axios.get(`/api/courses/${courseId}`)
      .then(res => {
        setCourse(res.data.course);
        setAssignments(res.data.assignments);

        // Fetch comments for each assignment
        res.data.assignments.forEach(async (assignment) => {
          const resComment = await axios.get(`/api/comments/${assignment.id}`);
          setComments(prev => ({ ...prev, [assignment.id]: resComment.data }));
        });
      })
      .catch(err => console.error("API error:", err));
  }, [courseId]);

  const handleInputChange = (id, value) => {
    setCommentInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmitComment = async (id) => {
    const text = commentInputs[id]?.trim();
    if (!text) return;

    try {
      const res = await axios.post("/api/comments", {
        assignmentId: id,
        userName: "Yuva",
        text,
      });

      setComments(prev => ({
        ...prev,
        [id]: [...(prev[id] || []), res.data],
      }));

      setCommentInputs(prev => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error("Failed to submit comment:", err);
    }
  };

  if (!course) return <div className="card">Loading...</div>;

  return (
    <div>
      <div className="card" style={{ display: "flex", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
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

      <div className="card">
        <h3>Lessons</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 15, marginTop: 10 }}>
          {course.lessons.map((lesson, i) => (
            <Link
              key={i}
              to={`/lesson/${lesson.toLowerCase().replace(/\s+/g, "-")}`}
              className="card clickable-card"
              style={{ flex: "1 1 150px", textAlign: "center" }}
            >
              {lesson}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3>Assignments</h3>
        {assignments.length > 0 ? (
          assignments.map(({ id, name, description, person }) => (
            <div key={id} className="card assignment-card" style={{ cursor: "default" }}>
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
                >
                  Post
                </button>
              </div>

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
          <div className="card" style={{ color: "#777" }}>No assignments yet.</div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
