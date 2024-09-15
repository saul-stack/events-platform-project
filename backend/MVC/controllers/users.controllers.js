const { fetchAllUsers, postUser } = require("../models/users.models");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to Fetch Users" });
  }
};

exports.postToUsers = async (req, res) => {
  try {
    await postUser(req.body);
    const users = await fetchAllUsers();
    res.status(201).json({
      message: `User posted successfully: ${req.body.title}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to Post User" });
  }
};
