const { pool } = require("../config/db");

const getAllCourses = async () => {
  const res = await pool.query("SELECT slug, subject FROM courses ORDER BY id DESC");
  return res.rows;
};

const getCourseBySlug = async (slug) => {
  const res = await pool.query("SELECT * FROM courses WHERE slug = $1", [slug]);
  return res.rows[0];
};

module.exports = { getAllCourses, getCourseBySlug };
