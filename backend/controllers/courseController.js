const { getAllCourses, getCourseBySlug } = require("../models/courseModel");
const { getAssignmentsByCourse } = require("../models/assignmentModel");

const fetchCourses = async (req, res) => {
  const courses = await getAllCourses();
  res.json(courses);
};

const fetchCourseDetail = async (req, res) => {
  const slug = req.params.slug;
  const course = await getCourseBySlug(slug);
  if (!course) return res.status(404).json({ message: "Course not found" });

  const assignments = await getAssignmentsByCourse(slug);
  res.json({ course, assignments });
};

module.exports = { fetchCourses, fetchCourseDetail };
