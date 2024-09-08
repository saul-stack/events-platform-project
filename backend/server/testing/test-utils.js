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

const fetchEventsData = async () => {
  try {
    const query = "SELECT * FROM events";
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching events data:", error);
    throw error;
  } finally {
    db.end();
  }
};

module.exports = { fetchEndpointsData, fetchEventsData };
