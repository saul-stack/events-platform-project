const db = require("../../database/connection.js");
const {
  checkIfTableExists,
  getValuesOfObjectProperties,
} = require("../../database/test-data/db-utils.js");

exports.fetchAllEvents = async () => {
  const tableExists = await checkIfTableExists("events");
  if (!tableExists) {
    throw new Error("Table does not exist");
  }
  const result = await db.query("SELECT * FROM events");
  return result.rows;
};

exports.postNewEvent = async (newEvent) => {
  try {
    const tableExists = await checkIfTableExists("events");
    if (!tableExists) {
      throw new Error("Table does not exist");
    }

    const singleEntryValues = getValuesOfObjectProperties(newEvent);

    await db.query(
      "INSERT INTO events (title, date, day_of_week, time, description, advance_price, door_price, tickets_total, tickets_sold, is_seated, is_ticketed, is_recurring) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
      singleEntryValues
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};
