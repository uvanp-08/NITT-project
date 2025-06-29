const pool = require("../config/db");

exports.recordUsage = async (req, res) => {
  const { lessonId, type, itemId } = req.body;
  try {
    await pool.query(
      "INSERT INTO lesson_usage (lesson_id, type, item_id) VALUES ($1, $2, $3)",
      [lessonId, type, itemId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error recording usage" });
  }
};

exports.getUsageByCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const result = await pool.query(
      `SELECT lu.type, COUNT(*) AS count
       FROM lesson_usage lu
       JOIN lessons l ON l.id = lu.lesson_id
       WHERE l.course_id = $1
       GROUP BY lu.type`,
      [courseId]
    );

    // Count lessons to calculate totals
    const lessonsRes = await pool.query(
      "SELECT COUNT(*)::int as total_video FROM lesson_videos WHERE lesson_id IN (SELECT id FROM lessons WHERE course_id = $1)",
      [courseId]
    );
    const materialsRes = await pool.query(
      "SELECT COUNT(*)::int as total_material FROM lesson_materials WHERE lesson_id IN (SELECT id FROM lessons WHERE course_id = $1)",
      [courseId]
    );
    const testsRes = await pool.query(
      "SELECT COUNT(*)::int as total_test FROM lesson_tests WHERE lesson_id IN (SELECT id FROM lessons WHERE course_id = $1)",
      [courseId]
    );

    const usage = { video: 0, material: 0, test: 0 };
    result.rows.forEach(r => usage[r.type] = parseInt(r.count));

    res.json({
      ...usage,
      totalVideo: lessonsRes.rows[0].total_video,
      totalMaterial: materialsRes.rows[0].total_material,
      totalTest: testsRes.rows[0].total_test,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch usage" });
  }
};
