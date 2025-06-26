const {
  getAllAssignments,
  getAssignmentById,
  createAssignment,
} = require("../models/assignmentModel");

// 🟢 Fetch all assignments (used on homepage)
const getAssignments = async (req, res) => {
  try {
    const assignments = await getAllAssignments();
    res.json(assignments);
  } catch (error) {
    console.error("❌ Failed to fetch assignments:", error);
    res.status(500).json({ message: "Server error while fetching assignments" });
  }
};

// 🟢 Fetch single assignment by ID
const getAssignment = async (req, res) => {
  try {
    const assignment = await getAssignmentById(req.params.id);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  } catch (error) {
    console.error("❌ Failed to fetch assignment by ID:", error);
    res.status(500).json({ message: "Server error while fetching assignment" });
  }
};

// 🟢 Post new assignment
const postAssignment = async (req, res) => {
  try {
    const assignment = await createAssignment(req.body);
    res.status(201).json(assignment);
  } catch (err) {
    console.error("❌ Error creating assignment:", err);
    res.status(500).json({ message: "Failed to create assignment" });
  }
};

module.exports = {
  getAssignments,
  getAssignment,
  postAssignment,
};
