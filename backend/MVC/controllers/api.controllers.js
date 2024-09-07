const { fetchAllEndpoints } = require("../models/api.models");

exports.getAllEndpoints = async (req, res) => {
  const METHOD = req.method;
  if (METHOD !== "GET") {
    console.error(` ${METHOD} Method Not Allowed on /api`);
    return res
      .status(405)
      .json({ error: `${METHOD} Method Not Allowed on /api` });
  }
  try {
    const endpoints = await fetchAllEndpoints();
    console.log(`Request Accepted: GET /api`);
    return res.status(200).json(endpoints);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to Fetch Endpoints" });
  }
};
