const fs = require("fs").promises;
const path = require("path");

const getEndpointsData = async () => {
  return JSON.parse(
    await fs.readFile(path.join(__dirname, "../endpoints.json"), "utf-8")
  );
};

module.exports = { getEndpointsData };
