const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../../server/endpoints.json");

exports.fetchAllEndpoints = async () => {
  try {
    const endpoints = await fs.readFile(filePath, "utf-8");
    return JSON.parse(endpoints);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
