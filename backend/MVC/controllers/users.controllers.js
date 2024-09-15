const { fetchAllUsers } = require("../models/users.models");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to Fetch Users" });
  }
};
