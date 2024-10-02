const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../../server/endpoints.json");

exports.fetchAllEndpoints = async () => {
  try {
    const jsonData = await fs.readFile(filePath, "utf-8");
    return JSON.parse(jsonData);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
