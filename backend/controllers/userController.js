const { createUser, getAllUsers } = require("../models/userModel");

// GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/users/register
const registerUser = async (req, res) => {
  console.log("📩 Incoming Request:", req.body);

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    const user = await createUser(name, email);
    console.log("✅ User created:", user);
    res.status(201).json(user);
  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(500).json({ message: "Registration failed" });
  }
};

module.exports = { getUsers, registerUser };
