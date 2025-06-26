const express = require("express");
const router = express.Router();
const { fetchCourses, fetchCourseDetail } = require("../controllers/courseController");

router.get("/", fetchCourses);
router.get("/:slug", fetchCourseDetail);

module.exports = router;
