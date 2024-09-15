const db = require("../connection");
const path = require("path");
const {
  fetchJson,
  verifyTableExists,
  truncateTable,
  createTable,
  seedTable,
} = require("../db-utils");

const seedTestTable = async (tableName) => {
  let tableDataPath;
  switch (tableName) {
    case "events":
      tableDataPath = path.join(__dirname, "events-test-data.json");
      break;
    case "users":
      tableDataPath = path.join(__dirname, "users-test-data.json");
      break;
    default:
      console.error(`Unknown table name: ${tableName}`);
      return;
  }

  let tableData = null;
  try {
    tableData = await fetchJson(tableDataPath);
  } catch (error) {
    console.error(`Error reading JSON file: ${error}`);
    return error;
  }

  let tableExists;
  try {
    tableExists = await verifyTableExists(tableName);
  } catch (error) {
    console.error(`Error checking if table exists: ${error}`);
    return error;
  }

  if (tableExists) {
    try {
      await truncateTable(tableName);
      console.log(`Table "${tableName}" truncated successfully`);
    } catch (error) {
      console.error(`Error truncating table: ${error}`);
      return error;
    }
  } else {
    try {
      await createTable(tableData.schema);
      console.log(`Table "${tableName}" created successfully`);
    } catch (error) {
      console.error(`Error creating table: ${error}`);
      return error;
    }
  }

  try {
    await seedTable(tableData);
    console.log(`Table "${tableName}" seeded successfully`);
  } catch (error) {
    console.error(`Error seeding table: ${error}`);
    return error;
  }
};

module.exports = { seedTestTable };
