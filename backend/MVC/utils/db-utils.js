const db = require("../../database/connection");
const path = require("path");
const { fetchJson } = require("./data-utils");
const { handleError, extractValues } = require("./global-utils");
const format = require("pg-format");

exports.verifyExists = async (tableName, id = null) => {
  let query;
  let params;

  if (id === null) {
    query = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = $1
      );
    `;
    params = [tableName];
  } else {
    query = `
      SELECT EXISTS (
        SELECT FROM ${tableName}
        WHERE id = $1
      );
    `;
    params = [id];
  }

  try {
    const result = await db.query(query, params);
    const exists = result.rows[0].exists;
    return exists;
  } catch (error) {
    handleError("Error checking if exists", error);
  }
};

exports.createTable = async (data) => {
  try {
    const { tableName, columns } = data.schema;
    const columnsDefinition = columns
      .map((col) => `${col.name} ${col.type}`)
      .join(", ");
    await db.query(`CREATE TABLE ${tableName} (${columnsDefinition});`);
    console.log(`Table "${tableName}" created successfully.`);
  } catch (error) {
    handleError(`Error creating table ${data.schema.tableName}`, error);
  }
};

exports.truncateTable = async (tableName) => {
  const truncateQuery = `TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE;`;
  try {
    await db.query(truncateQuery);
    console.log(`Table "${tableName}" truncated successfully.`);
  } catch (error) {
    handleError(`Error truncating table ${tableName}`, error);
  }
};

exports.seedTestTable = async (tableName) => {
  const tableDataPaths = {
    events: path.join(
      __dirname,
      "../../database/test-data/events-test-data.json"
    ),
    users: path.join(
      __dirname,
      "../../database/test-data/users-test-data.json"
    ),
  };

  const tableDataPath = tableDataPaths[tableName];
  const tableData = await fetchJson(tableDataPath);
  if (!tableDataPath) {
    console.log(`Test data not found for table: ${tableName}`);
    throw new Error("Test data not found");
  }

  try {
    const { entries, schema } = await fetchJson(tableDataPath);
    const { columns } = schema;

    const query = `INSERT INTO ${tableName} (${columns
      .slice(1)
      .map((col) => col.name)
      .join(", ")}) VALUES (${columns
      .slice(1)
      .map((_, index) => `$${index + 1}`)
      .join(", ")})`;

    if (await exports.verifyExists(tableName)) {
      await exports.truncateTable(tableName);
    } else {
      await exports.createTable(tableData);
    }

    for (const entry of entries) {
      const values = extractValues(entry);
      const formattedQuery = format(query, values);
      await db.query(formattedQuery, values);
    }

    console.log(`Test table "${tableName}" seeded successfully.`);
  } catch (error) {
    handleError(`Error seeding test table ${tableName}`, error);
    throw error;
  }
};

exports.fetchValidEventIds = async () => {
  try {
    const query = "SELECT id FROM events";
    const result = await db.query(query);
    return result.rows.map((row) => row.id);
  } catch (error) {
    handleError("Error fetching valid event ids", error);
  }
};

exports.fetchTable = async (tableName) => {
  const query = `SELECT * FROM ${tableName}`;
  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    handleError(`Error fetching table data from ${tableName}`, error);
  }
};

exports.fetchTableEntry = async (tableName, entryId) => {
  const query = `SELECT * FROM ${tableName} WHERE id = $1`;
  try {
    const result = await db.query(query, [entryId]);
    return result.rows[0];
  } catch (error) {
    handleError(
      `Error fetching entry with id ${entryId} from table ${tableName}`,
      error
    );
  }
};
