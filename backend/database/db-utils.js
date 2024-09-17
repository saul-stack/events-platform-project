const db = require("./connection");
const fs = require("fs").promises;
const path = require("path");

const handleError = (message, error) => {
  console.error(`${message}:`, error);
  throw error;
};

const fetchJson = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    handleError(`Error reading JSON file at ${filePath}`, error);
  }
};

const extractValues = (obj) => Object.values(obj);

const verifyExists = async (tableName, id = null) => {
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
    console.log(
      `${id === null ? "Table" : "Entry"} "${
        id === null ? tableName : id
      }" exists: ${exists}`
    );
    return exists;
  } catch (error) {
    console.error(
      `Error checking if ${id === null ? "table" : "entry"} ${
        id === null ? tableName : id
      } exists:`,
      error
    );
    throw error;
  }
};

const truncateTable = async (tableName) => {
  const truncateQuery = `TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE;`;
  try {
    await db.query(truncateQuery);
    console.log(`Table "${tableName}" truncated successfully.`);
  } catch (error) {
    handleError(`Error truncating table ${tableName}`, error);
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
  } catch (error) {
    handleError(`Error creating table ${data.schema.tableName}`, error);
  }
};

const seedTable = async (tableData) => {
  const { entries, schema } = tableData;
  const { tableName, columns } = schema;

  const query = `INSERT INTO ${tableName} (${columns
    .slice(1)
    .map((col) => col.name)
    .join(", ")}) VALUES (${columns
    .slice(1)
    .map((_, index) => `$${index + 1}`)
    .join(", ")})`;

  try {
    for (const entry of entries) {
      const values = extractValues(entry);
      await db.query(query, values);
    }
    console.log(`Table "${tableName}" seeded successfully.`);
  } catch (error) {
    handleError(`Error seeding table ${tableName}`, error);
  }
};

const seedTestTable = async (tableName) => {
  const tableDataPaths = {
    events: path.join(__dirname, "/test-data/events-test-data.json"),
    users: path.join(__dirname, "/test-data/users-test-data.json"),
  };

  const tableDataPath = tableDataPaths[tableName];
  if (!tableDataPath) {
    console.error(`Test data not found for table: ${tableName}`);
    return;
  }

  try {
    const tableData = await fetchJson(tableDataPath);
    const tableExists = await verifyExists(tableName);

    if (tableExists) {
      await truncateTable(tableName);
    } else {
      await createTable(tableData);
    }

    await seedTable(tableData);
  } catch (error) {
    handleError(`Error seeding test table ${tableName}`, error);
  }
};

const getEntryPropertyValue = async (tableName, id, propertyName) => {
  try {
    const tableExists = await verifyExists(tableName);
    if (!tableExists) throw new Error("Table does not exist");

    const query = `SELECT ${propertyName} FROM ${tableName} WHERE id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    handleError(
      `Error getting property value ${propertyName} from table ${tableName}`,
      error
    );
  }
};

const hasDuplicates = (arrayString) => {
  if (arrayString) {
    const array = JSON.parse(arrayString);

    const uniqueArrayEntries = new Set(array.flat());

    return uniqueArrayEntries.size !== array.length;
  }
};

const fetchEndpointsData = async () => {
  try {
    return await fetchJson(path.join(__dirname, "../endpoints.json"));
  } catch (error) {
    handleError("Error fetching endpoints data", error);
  }
};

const fetchTable = async (tableName) => {
  const query = `SELECT * FROM ${tableName}`;
  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    handleError(`Error fetching table data from ${tableName}`, error);
  }
};

const fetchTableEntry = async (tableName, entryId) => {
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

const verifyValidEmailAddress = async (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValidFormat = emailRegex.test(email);
  return isEmailValidFormat;
};

module.exports = {
  truncateTable,
  createTable,
  seedTable,
  fetchJson,
  extractValues,
  getEntryPropertyValue,
  fetchEndpointsData,
  fetchTable,
  fetchTableEntry,
  seedTestTable,
  verifyValidEmailAddress,
  verifyExists,
  hasDuplicates,
};
