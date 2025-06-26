const express = require("express");
const router = express.Router();
const {
  getAssignments,    // GET /api/assignments
  getAssignment,     // GET /api/assignments/:id
  postAssignment     // POST /api/assignments
} = require("../controllers/assignmentController");

// Get all assignments (for homepage)
router.get("/", getAssignments);

// Get a single assignment by ID
router.get("/:id", getAssignment);

// Create a new assignment
router.post("/", postAssignment);

module.exports = router;
