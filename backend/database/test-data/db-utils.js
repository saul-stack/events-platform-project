const eventsAndUsersPool = require("../connection");
const fs = require("fs").promises;

const checkIfTableExists = async (tableName) => {
  const query = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_name = $1
    );
  `;
  try {
    const result = await eventsAndUsersPool.query(query, [tableName]);
    console.log(`Table "${tableName}" exists: ${result.rows[0].exists}`);
    return result.rows[0].exists;
  } catch (err) {
    console.error(`Error checking if table ${tableName} exists:`, err);
    throw err;
  }
};

const resetEntryIdSequence = async (tableName) => {
  const resetIdSequenceQuery = `ALTER SEQUENCE ${tableName}_id_seq RESTART WITH 1;`;
  try {
    await eventsAndUsersPool.query(resetIdSequenceQuery);
    console.log(`ID sequence for table "${tableName}" reset successfully.`);
  } catch (err) {
    console.error(`Error resetting ID sequence for table ${tableName}:`, err);
  }
};

const truncateTable = async (tableName) => {
  const truncateQuery = `TRUNCATE TABLE ${tableName};`;
  try {
    await eventsAndUsersPool.query(truncateQuery);
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
    await eventsAndUsersPool.query(
      `CREATE TABLE ${tableName} (${columnsDefinition});`
    );
    console.log(`Table "${tableName}" created successfully.`);
  } catch (err) {
    console.error(`Error creating table ${tableName}:`, err);
    throw err;
  }
};

const getDataFromJSON = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error(`Error reading JSON file at ${filePath}:`, error);
    throw error;
  }
};

const seedTable = async (tableData) => {
  const { tableName, columns } = tableData.schema;
  const queryString = `INSERT INTO ${tableName} (${columns
    .slice(1)
    .map((col) => col.name)
    .join(", ")}) VALUES (${columns
    .slice(1)
    .map((col, index) => `$${index + 1}`)
    .join(", ")})`;

  let valuesArray = [];
  tableData.data.forEach((row) => {
    const values = columns.slice(1).map((col) => row[col.name]);
    valuesArray.push(values);
  });

  try {
    const result = await eventsAndUsersPool.query(
      queryString,
      valuesArray.flat()
    );
    console.log("Data inserted successfully");
    return result;
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

module.exports = {
  checkIfTableExists,
  truncateTable,
  createTable,
  seedTable,
  getDataFromJSON,
  resetEntryIdSequence,
};
