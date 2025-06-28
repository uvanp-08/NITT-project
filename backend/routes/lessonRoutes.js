const express = require("express");
const router = express.Router();
const { getLessonDetail } = require("../controllers/lessonController");

router.get("/:lessonSlug", getLessonDetail);

module.exports = router;
