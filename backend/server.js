// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const courseRoutes = require("./routes/courseRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes"); // ✅ Import this
const commentRoutes = require("./routes/commentRoutes");


connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API Running"));

app.use("/api/courses", courseRoutes);         // Course detail page
app.use("/api/assignments", assignmentRoutes); // Homepage assignments ✅
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend listening on port ${PORT}`));
