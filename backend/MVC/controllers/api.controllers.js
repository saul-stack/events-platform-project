const { fetchAllEndpoints } = require("../models/api.models");

exports.getAllEndpoints = async (req, res) => {
  try {
    const endpoints = await fetchAllEndpoints();
    res.status(200).send(endpoints);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch endpoints" });
  }
};
