// backend/models/assignmentModel.js
const { pool } = require("../config/db");

const getAllAssignments = async () => {
  const res = await pool.query("SELECT * FROM assignments ORDER BY id DESC");
  return res.rows;
};

const getAssignmentById = async (id) => {
  const res = await pool.query("SELECT * FROM assignments WHERE id = $1", [id]);
  return res.rows[0];
};

const createAssignment = async (assignment) => {
  const {
    name, description, person, time_assigned, due_date, marks, files, course_slug,
  } = assignment;

  const res = await pool.query(
    `INSERT INTO assignments (name, description, person, time_assigned, due_date, marks, files, course_slug)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [name, description, person, time_assigned, due_date, marks, files, course_slug]
  );

  return res.rows[0];
};

const getAssignmentsByCourse = async (slug) => {
  const res = await pool.query("SELECT * FROM assignments WHERE course_slug = $1 ORDER BY id DESC", [slug]);
  return res.rows;
};

// ✅ Export all functions
module.exports = {
  getAllAssignments,
  getAssignmentById,
  createAssignment,
  getAssignmentsByCourse,
};
