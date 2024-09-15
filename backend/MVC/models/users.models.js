const db = require("../../database/connection.js");
const {
  verifyTableExists,
  extractValues,
} = require("../../database/db-utils.js");

const fetchAllUsers = async () => {
  const tableExists = await verifyTableExists("users");
  if (!tableExists) {
    throw new Error("Table does not exist");
  }
  const result = await db.query("SELECT * FROM users");
  return result.rows;
};

const postUser = async (newUser) => {
  try {
    const tableExists = await verifyTableExists("users");
    if (!tableExists) {
      throw new Error("Table does not exist");
    }

    const values = extractValues(newUser);
    console.log("values", values);
    await db.query(
      "INSERT INTO users (first_name, last_name, user_name, events_watched, events_booked, email, password, role ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      values
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};
module.exports = {
  fetchAllUsers,
  postUser,
};
