const db = require("../connection");
const path = require("path");
const {
  getDataFromJSON,
  checkIfTableExists,
  truncateTable,
  createTable,
  seedTable,
} = require("./db-utils");
const eventsTestDataPath = path.join(__dirname, "events-test-data.json");

const seedTestEvents = async () => {
  let tableData = null;
  try {
    tableData = await getDataFromJSON(eventsTestDataPath);
  } catch (error) {
    console.error(`Error reading JSON file: ${error}`);
    return error;
  }

  const { tableName } = tableData.schema;
  let tableExists;
  try {
    tableExists = await checkIfTableExists(tableName);
  } catch (error) {
    console.error(`Error checking if table exists: ${error}`);
    return error;
  }

  if (tableExists) {
    try {
      await truncateTable(tableName);
      console.log("Table truncated successfully");
    } catch (error) {
      console.error(`Error truncating table: ${error}`);
      return error;
    }
  } else {
    try {
      await createTable(tableData.schema);
      console.log("Table created successfully");
    } catch (error) {
      console.error(`Error creating table: ${error}`);
      return error;
    }
  }

  try {
    await seedTable(tableData);
    console.log("Table seeded successfully");
  } catch (error) {
    console.error(`Error seeding table: ${error}`);
    return error;
  }
};

module.exports = { seedTestEvents };
