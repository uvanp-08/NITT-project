const {
  getCommentsByAssignment,
  createComment,
} = require("../models/commentModel");

const getComments = async (req, res) => {
  const assignmentId = req.params.id;
  const comments = await getCommentsByAssignment(assignmentId);
  res.json(comments);
};

const postComment = async (req, res) => {
  try {
    const newComment = await createComment(req.body);
    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ message: "Failed to post comment" });
  }
};

module.exports = { getComments, postComment };
