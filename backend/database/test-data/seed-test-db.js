const db = require("../connection");
const path = require("path");
const {
  getDataFromJSON,
  checkIfTableExists,
  truncateTable,
  createTable,
  seedTable,
} = require("./db-utils");
const eventsTestDataPath = path.join(__dirname, "test-data.json");

const seedTestTable = async () => {
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

  if (!tableExists) {
    try {
      await createTable(tableData);
    } catch (error) {
      console.error(`Error creating table: ${error}`);
      return error;
    }
  }

  try {
    await truncateTable(tableName);
  } catch (error) {
    console.error(`Error truncating table: ${error}`);
    return error;
  }

  try {
    await seedTable(tableData);
    console.log("Table seeded successfully.");
  } catch (error) {
    console.error(`Error seeding table: ${error}`);
    return error;
  }
};

seedTestTable();
module.exports = { seedTestTable };
