import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const motivationalQuotes = [
  "Believe you can and you're halfway there.",
  "Every expert was once a beginner.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Success doesn’t just find you. You have to go out and get it.",
  "Great things never come from comfort zones.",
];

const assignmentsData = [
  {
    id: 1,
    name: "Math Assignment",
    description: "Solve the problems from chapters 3 and 4.",
    person: "JS",
  },
  {
    id: 2,
    name: "Science Project",
    description: "Prepare a presentation on renewable energy.",
    person: "AL",
  },
  {
    id: 3,
    name: "History Essay",
    description: "Write an essay about World War II causes.",
    person: "MK",
  },
  {
    id: 4,
    name: "English Literature",
    description: "Read and analyze 'To Kill a Mockingbird'.",
    person: "SR",
  },
];

const Home = () => {
  const [commentInputs, setCommentInputs] = useState({});
  const [comments, setComments] = useState({});
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (id, value) => {
    setCommentInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitComment = (id) => {
    const comment = commentInputs[id]?.trim();
    if (!comment) return;
    setComments((prev) => {
      const prevComments = prev[id] || [];
      return { ...prev, [id]: [...prevComments, { user: "Yuva", text: comment }] };
    });
    setCommentInputs((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div>
      <div className="quote-banner">
        <p>{motivationalQuotes[quoteIndex]}</p>
      </div>

      <div className="welcome-section">
        <h2>Good Morning, Yuva</h2>
        <p>Welcome To The Classroom</p>
      </div>

      {assignmentsData.map(({ id, name, description, person }) => (
        <div
          key={id}
          className="card assignment-card"
          style={{ cursor: "default" }}
        >
          <Link
            to={`/assignment/${id}`}
            className="assignment-header clickable-card"
            style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "flex-start", gap: "15px" }}
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
                    <strong>{comment.user}: </strong> {comment.text}
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
