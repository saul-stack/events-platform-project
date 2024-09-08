const fs = require("fs").promises;
const path = require("path");
const db = require("../../database/connection.js");

const getEndpointsData = async () => {
  return JSON.parse(
    await fs.readFile(path.join(__dirname, "../endpoints.json"), "utf-8")
  );
};

const getEventsData = async () => {
  const query = "SELECT * FROM events";
  const result = await db.query(query);
  return result.rows;
};

module.exports = { getEndpointsData, getEventsData };
