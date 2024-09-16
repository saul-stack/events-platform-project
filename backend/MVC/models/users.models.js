const db = require("../../database/connection.js");
const {
  verifyTableExists,
  extractValues,
  verifyEntryExists,
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
    await db.query(
      "INSERT INTO users (first_name, last_name, user_name, events_watched, events_booked, email, password, role ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      values
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

const fetchUser = async (tableName, userId) => {
  try {
    const tableExists = await verifyTableExists(tableName);
    if (!tableExists) {
      throw new Error("Table does not exist");
    }
    const userExists = await verifyEntryExists(tableName, userId);
    if (!userExists) {
      const error = new Error(`User with ID ${userId} not found.`);
      error.status = 404;
      throw error;
    }

    const result = await db.query(`SELECT * FROM ${tableName} WHERE id = $1`, [
      userId,
    ]);

    const user = result.rows[0];
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const tableExists = await verifyTableExists("users");
    if (!tableExists) {
      throw new Error("Table does not exist");
    }
    const userExists = await verifyEntryExists("users", userId);
    if (!userExists) {
      const error = new Error(`User with ID ${userId} not found.`);
      error.status = 404;
      throw error;
    }
    await db.query("DELETE FROM users WHERE id = $1", [userId]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  fetchAllUsers,
  postUser,
  fetchUser,
  deleteUser,
};
