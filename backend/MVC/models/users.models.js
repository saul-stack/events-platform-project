const db = require("../../database/connection.js");
const { verifyExists } = require("../utils/db-utils.js");

const {
  extractValues,
  verifyValidEmailAddress,
  handleError,
} = require("../utils/global-utils.js");

const fetchAllUsers = async () => {
  const tableExists = await verifyExists("users");
  if (!tableExists) {
    throw new Error("Table not found");
  }
  const result = await db.query("SELECT * FROM users");
  return result.rows;
};

const postUser = async (newUser) => {
  try {
    if (
      !Array.isArray(newUser.events_watched) ||
      !Array.isArray(newUser.events_booked)
    ) {
      throw new Error("Invalid Request Format.");
    }

    const tableExists = await verifyExists("users");
    if (!tableExists) {
      throw new Error("Table not found");
    }

    const values = extractValues(newUser);
    await db.query(
      "INSERT INTO users (first_name, last_name, user_name, events_watched, events_booked, email, role ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      values
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

const fetchUserById = async (tableName, userId) => {
  try {
    const tableExists = await verifyExists(tableName);

    if (!tableExists) {
      throw new Error("Table not found");
    }
    const userExists = await verifyExists(tableName, userId);
    if (!userExists) {
      const error = new Error(`User not found.`);
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

const fetchUserByUsername = async (tableName, username) => {
  try {
    const tableExists = await verifyExists(tableName);

    if (!tableExists) {
      throw new Error("Table not found");
    }

    const result = await db.query(
      `SELECT * FROM ${tableName} WHERE user_name = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user === undefined) {
      const error = new Error(`User not found.`);
      error.status = 404;
      throw error;
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const tableExists = await verifyExists("users");
    if (!tableExists) {
      throw new Error("Table not found");
    }
    const userExists = await verifyExists("users", userId);
    if (!userExists) {
      const error = new Error(`User not found.`);
      error.status = 404;
      throw error;
    }
    await db.query("DELETE FROM users WHERE id = $1", [userId]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const patchUser = async (userId, patchObject) => {
  try {
    const tableExists = await verifyExists("users");
    if (!tableExists) {
      throw new Error("Table not found");
    }
    const userExists = await verifyExists("users", userId);
    if (!userExists) {
      const error = new Error(`User not found.`);
      error.status = 404;
      throw error;
    }

    const propertyToPatch = Object.keys(patchObject)[0];
    const valueToPatch = patchObject[propertyToPatch];

    if (propertyToPatch === "email") {
      verifyValidEmailAddress(valueToPatch);
    }

    const query = `UPDATE users SET ${propertyToPatch} = $1 WHERE id = $2`;

    await db.query(query, [valueToPatch, userId]);
    const updatedUser = await fetchUserById("users", userId);
    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  fetchAllUsers,
  postUser,
  fetchUserById,
  deleteUser,
  patchUser,
  fetchUserByUsername,
};
