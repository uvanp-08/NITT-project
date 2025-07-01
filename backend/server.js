require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const courseRoutes = require("./routes/courseRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const commentRoutes = require("./routes/commentRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const usageRoutes = require("./routes/usageRoutes");
const userRoutes = require("./routes/userRoutes"); // ✅ ADD THIS

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API Running"));

app.post('/api/usage', async (req, res) => {
  const { type, itemId, lessonId } = req.body;
  try {
    await pool.query(
      'INSERT INTO usage_data (type, item_id, lesson_id, used_at) VALUES ($1, $2, $3, NOW())',
      [type, itemId, lessonId]
    );
    res.status(200).json({ message: 'Usage recorded' });
  } catch (err) {
    console.error('Error recording usage:', err);
    res.status(500).json({ message: 'Failed to record usage' });
  }
});

app.use("/api/courses", courseRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/quiz", require("./routes/quiz"));
app.use("/api/usage", usageRoutes);
app.use("/api/users", userRoutes); // ✅ ADD THIS LINE

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend listening on port ${PORT}`));
