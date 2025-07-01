const { pool } = require("../config/db");

// Create a new user
const createUser = async (name, email, password) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password]
  );
  return result.rows[0];
};

// Get all users
const getAllUsers = async () => {
  const result = await pool.query("SELECT id, name, email FROM users");
  return result.rows;
};

// Find user by email
const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getAllUsers,
  findUserByEmail,
};
