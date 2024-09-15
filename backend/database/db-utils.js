const db = require("./connection");
const fs = require("fs").promises;
const path = require("path");

const verifyTableExists = async (tableName) => {
  const query = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_name = $1
    );
  `;
  try {
    const result = await db.query(query, [tableName]);
    console.log(`Table "${tableName}" exists: ${result.rows[0].exists}`);
    return result.rows[0].exists;
  } catch (err) {
    console.error(`Error checking if table ${tableName} exists:`, err);
    throw err;
  }
};

const verifyEntryExists = async (tableName, id) => {
  const query = `
    SELECT EXISTS (
      SELECT FROM ${tableName}
      WHERE id = $1
    );
  `;
  try {
    const result = await db.query(query, [id]);
    const entryExists = result.rows[0].exists;
    return entryExists;
  } catch (error) {
    console.error(`Error checking if entry with id ${id} exists:`, error);
    throw error;
  }
};

const truncateTable = async (tableName) => {
  const truncateQuery = `TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE;`;
  try {
    await db.query(truncateQuery);
    console.log(`Table "${tableName}" truncated successfully.`);
  } catch (err) {
    console.error(`Error truncating table ${tableName}:`, err);
    throw err;
  }
};

const createTable = async (data) => {
  try {
    const { tableName, columns } = data.schema;
    const columnsDefinition = columns
      .map((col) => `${col.name} ${col.type}`)
      .join(", ");
    await db.query(`CREATE TABLE ${tableName} (${columnsDefinition});`);
    console.log(`Table "${tableName}" created successfully.`);
  } catch (err) {
    console.error(`Error creating table ${tableName}:`, err);
    throw err;
  }
};

const fetchJson = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error(`Error reading JSON file at ${filePath}:`, error);
    throw error;
  }
};

const extractValues = (obj) => {
  return Object.keys(obj).map((key) => obj[key]);
};

const seedTable = async (tableData) => {
  const { entries, schema } = tableData;
  const { tableName, columns } = schema;
  const entriesToAdd = [];
  const query = `INSERT INTO ${tableName} (${columns
    .slice(1)
    .map((col) => col.name)
    .join(", ")}) VALUES (${columns
    .slice(1)
    .map((col, index) => `$${index + 1}`)
    .join(", ")})`;

  entries.map((entry) => {
    let singleEntryValues = extractValues(entry);
    entriesToAdd.push(singleEntryValues);
  });

  try {
    for (let singleEntryValues of entriesToAdd) {
      await db.query(query, singleEntryValues);
    }
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

const getEntryPropertyValue = async (tableName, id, propertyName) => {
  try {
    const tableExists = await verifyTableExists(tableName);
    if (!tableExists) {
      throw new Error("Table does not exist");
    }

    const query = `SELECT ${propertyName} FROM ${tableName} WHERE id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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

module.exports = {
  verifyTableExists,
  truncateTable,
  createTable,
  seedTable,
  fetchJson,
  extractValues,
  verifyEntryExists,
  getEntryPropertyValue,
  fetchEndpointsData,
  fetchTable,
  fetchTableEntry,
};
