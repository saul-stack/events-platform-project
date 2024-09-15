const db = require("../../database/connection.js");
const { verifyTableExists } = require("../../database/db-utils.js");

const fetchAllUsers = async () => {
  const tableExists = await verifyTableExists("users");
  if (!tableExists) {
    throw new Error("Table does not exist");
  }
  const result = await db.query("SELECT * FROM users");
  return result.rows;
};

module.exports = {
  fetchAllUsers,
};
