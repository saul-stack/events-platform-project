const db = require("../../database/connection.js");
const {
  checkIfTableExists,
  getValuesOfObjectProperties,
  checkIfEntryExistsById,
} = require("../../database/test-data/db-utils.js");

const fetchAllEvents = async () => {
  const tableExists = await checkIfTableExists("events");
  if (!tableExists) {
    throw new Error("Table does not exist");
  }
  const result = await db.query("SELECT * FROM events");
  return result.rows;
};

const postEvent = async (newEvent) => {
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

const fetchTableEntry = async (tableName, eventId) => {
  try {
    const tableExists = await checkIfTableExists(tableName);
    if (!tableExists) {
      throw new Error("Table does not exist");
    }
    const eventExists = await checkIfEntryExistsById(tableName, eventId);
    if (!eventExists) {
      const error = new Error(`Event with ID ${eventId} not found.`);
      error.status = 404;
      throw error;
    }

    const result = await db.query(`SELECT * FROM ${tableName} WHERE id = $1`, [
      eventId,
    ]);
    const event = result.rows[0];
    return event;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteEvent = async (eventId) => {
  try {
    const tableExists = await checkIfTableExists("events");
    if (!tableExists) {
      throw new Error("Table does not exist");
    }
    const eventExists = await checkIfEntryExistsById("events", eventId);
    if (!eventExists) {
      const error = new Error(`Event with ID ${eventId} not found.`);
      error.status = 404;
      throw error;
    }
    await db.query("DELETE FROM events WHERE id = $1", [eventId]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const patchEvent = async (eventId, patchObject) => {
  try {
    const tableExists = await checkIfTableExists("events");
    if (!tableExists) {
      throw new Error("Table does not exist");
    }
    const eventExists = await checkIfEntryExistsById("events", eventId);
    if (!eventExists) {
      const error = new Error(`Event with ID ${eventId} not found.`);
      error.status = 404;
      throw error;
    }

    const propertyToPatch = Object.keys(patchObject)[0];

    const valueToPatch = patchObject[propertyToPatch];

    const query = `UPDATE events SET ${propertyToPatch} = $1 WHERE id = $2`;

    await db.query(query, [valueToPatch, eventId]);
    const updatedEvent = await fetchTableEntry("events", eventId);
    return updatedEvent;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  fetchTableEntry,
  deleteEvent,
  patchEvent,
  postEvent,
  fetchAllEvents,
};
