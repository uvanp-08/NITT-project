// controllers/lessonController.js
const {
  getLessonBySlug,
  getLessonVideos,
  getLessonMaterials,
  getLessonTests,
} = require("../models/lessonModel");

const getLessonDetail = async (req, res) => {
  try {
    const slug = req.params.lessonSlug;
    const lesson = await getLessonBySlug(slug);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    const [videos, materials, tests] = await Promise.all([
      getLessonVideos(lesson.id),
      getLessonMaterials(lesson.id),
      getLessonTests(lesson.id),
    ]);

    res.json({ lesson, videos, materials, tests });
  } catch (err) {
    console.error("Lesson fetch error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getLessonDetail };
