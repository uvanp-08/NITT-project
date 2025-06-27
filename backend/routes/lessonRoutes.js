const express = require("express");
const router = express.Router();
const { getLessonDetail } = require("../controllers/lessonController"); // ✅ Correct path and name

router.get("/:lessonSlug", getLessonDetail); // ✅ Make sure this is a function

module.exports = router;
