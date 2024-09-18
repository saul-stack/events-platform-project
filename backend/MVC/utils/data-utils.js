const fs = require("fs").promises;
const path = require("path");
const { handleError } = require("./global-utils");

exports.fetchJson = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    handleError(`Error reading JSON file at ${filePath}`, error);
  }
};

exports.fetchEndpointsData = async () => {
  try {
    return await exports.fetchJson(
      path.join(__dirname, "../../server/endpoints.json")
    );
  } catch (error) {
    handleError("Error fetching endpoints data", error);
  }
};
