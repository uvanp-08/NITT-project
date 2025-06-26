// config/db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const connectDB = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL connected");
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
};

module.exports = { connectDB, pool }; // ✅ Export both
