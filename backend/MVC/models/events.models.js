const db = require("../../database/connection.js");
const { checkIfTableExists } = require("../../database/test-data/db-utils.js");
exports.fetchAllEvents = async () => {
  const tableExists = await checkIfTableExists("events");
  if (!tableExists) {
    throw new Error("Table does not exist");
  }
  const result = await db.query("SELECT * FROM events");
  return result.rows;
};
