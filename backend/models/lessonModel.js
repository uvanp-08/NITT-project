const { pool } = require("../config/db");

const getLessonBySlug = async (slug) => {
  const res = await pool.query("SELECT * FROM lessons WHERE slug = $1", [slug]);
  return res.rows[0];
};

const getLessonVideos = async (lessonId) => {
  const res = await pool.query("SELECT * FROM lesson_videos WHERE lesson_id = $1", [lessonId]);
  return res.rows;
};

const getLessonMaterials = async (lessonId) => {
  const res = await pool.query("SELECT * FROM lesson_materials WHERE lesson_id = $1", [lessonId]);
  return res.rows;
};

const getLessonTests = async (lessonId) => {
  const res = await pool.query("SELECT * FROM lesson_tests WHERE lesson_id = $1", [lessonId]);
  return res.rows;
};

module.exports = {
  getLessonBySlug,
  getLessonVideos,
  getLessonMaterials,
  getLessonTests,
};
