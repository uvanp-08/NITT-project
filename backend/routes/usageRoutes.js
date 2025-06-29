const express = require("express");
const router = express.Router();
const {
  recordUsage,
  getUsageByCourse,
} = require("../controllers/usageController");

router.post("/record", recordUsage);
router.get("/course/:courseId", getUsageByCourse);
module.exports = router;
