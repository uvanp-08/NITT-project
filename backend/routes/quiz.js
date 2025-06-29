const express = require("express");
const router = express.Router();
const { pool } = require("../config/db"); // ✅ Correct import

router.post("/save", async (req, res) => {
  const { totalAnswered, correctCount } = req.body;
  try {
    await pool.query(
      "INSERT INTO quiz_stats (total_answered, correct_count) VALUES ($1, $2)",
      [totalAnswered, correctCount]
    );
    res.json({ message: "Stats saved" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
