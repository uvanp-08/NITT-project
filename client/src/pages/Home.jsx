import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const motivationalQuotes = [
  "Believe you can and you're halfway there.",
  "Every expert was once a beginner.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Success doesn’t just find you. You have to go out and get it.",
  "Great things never come from comfort zones.",
];

const Home = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [assignments, setAssignments] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [comments, setComments] = useState({});

  // ✅ Get user name from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || "Guest";

  // Rotate quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch assignments and their comments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/assignments");
        setAssignments(res.data);

        // Fetch comments for each assignment
        res.data.forEach(async (assignment) => {
          const commentRes = await axios.get(`http://localhost:5000/api/comments/${assignment.id}`);
          setComments((prev) => ({ ...prev, [assignment.id]: commentRes.data }));
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAssignments();
  }, []);

  // Handle textarea input
  const handleInputChange = (id, value) => {
    setCommentInputs((prev) => ({ ...prev, [id]: value }));
  };

  // Submit comment
  const handleSubmitComment = async (id) => {
    const text = commentInputs[id]?.trim();
    if (!text) return;

    try {
      const res = await axios.post("http://localhost:5000/api/comments", {
        assignmentId: id,
        userName, // ✅ use actual logged-in name
        text,
      });

      setComments((prev) => ({
        ...prev,
        [id]: [...(prev[id] || []), res.data],
      }));
      setCommentInputs((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error("Failed to submit comment:", err);
    }
  };

  return (
    <div>
      <div className="quote-banner">
        <p>{motivationalQuotes[quoteIndex]}</p>
      </div>

      <div className="welcome-section">
        <h2>Good Morning, {userName}</h2> {/* ✅ dynamically show user name */}
        <p>Welcome To The Classroom</p>
      </div>

      {assignments.map(({ id, name, description, person }) => (
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
      ))}
    </div>
  );
};

export default Home;
