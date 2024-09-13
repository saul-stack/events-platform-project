const { fetchAllEndpoints } = require("../models/api.models");

exports.getAllEndpoints = async (req, res) => {
  try {
    const endpoints = await fetchAllEndpoints();
    return res.status(200).json(endpoints);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to Fetch Endpoints" });
  }
};
