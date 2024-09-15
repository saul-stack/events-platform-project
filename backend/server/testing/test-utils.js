const fs = require("fs").promises;
const path = require("path");
const db = require("../../database/connection.js");

const fetchEndpointsData = async () => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../endpoints.json"),
      "utf-8"
    );
    return JSON.parse(data);
  } catch (error) {
    console.error("Error fetching endpoints data:", error);
    throw error;
  }
};

const fetchTable = async (tableName) => {
  try {
    const query = `SELECT * FROM ${tableName}`;
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching events data:", error);
    throw error;
  }
};

const fetchTableEntry = async (tableName, entryId) => {
  try {
    const query = `SELECT * FROM ${tableName} WHERE ${entryId} = $1`;
    const result = await db.query(query, [entryId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching event data:", error);
    throw error;
  }
};

module.exports = { fetchEndpointsData, fetchTable, fetchTableEntry };
