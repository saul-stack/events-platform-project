const db = require("../connection");
const path = require("path");
const {
  getDataFromJSON,
  checkIfTableExists,
  truncateTable,
  createTable,
  seedTable,
  resetEntryIdSequence,
} = require("./db-utils");
const testDataPath = path.join(__dirname, "test-data.json");

const seedTestTable = async () => {
  let tableData = null;
  try {
    tableData = await getDataFromJSON(testDataPath);
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
    await resetEntryIdSequence(tableName);
  } catch (error) {
    console.error(`Error resetting ID sequence for table: ${error}`);
    return error;
  }

  try {
    await seedTable(tableData);
    console.log("Table seeded successfully.");
  } catch (error) {
    console.error(`Error seeding table: ${error}`);
    return error;
  } finally {
    db.end();
  }
};

seedTestTable();
module.exports = { seedTestTable };
