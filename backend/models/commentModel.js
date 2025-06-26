const { pool } = require("../config/db");

const getCommentsByAssignment = async (assignmentId) => {
  const res = await pool.query(
    "SELECT * FROM comments WHERE assignment_id = $1 ORDER BY created_at ASC",
    [assignmentId]
  );
  return res.rows;
};

const createComment = async ({ assignmentId, userName, text }) => {
  const res = await pool.query(
    `INSERT INTO comments (assignment_id, user_name, text)
     VALUES ($1, $2, $3) RETURNING *`,
    [assignmentId, userName, text]
  );
  return res.rows[0];
};

module.exports = {
  getCommentsByAssignment,
  createComment,
};
