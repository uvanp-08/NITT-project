const { pool } = require("../config/db");

// Function to insert a new user
const createUser = async (name, email) => {
  try {
    console.log("🛠️ Inserting user into DB...");
    
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );

    console.log("✅ User inserted:", result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error("❌ Error inserting user:", err);
    throw err; // Rethrow to be handled by controller
  }
};

// Function to fetch all users
const getAllUsers = async () => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    throw err;
  }
};

module.exports = { createUser, getAllUsers };
