const { verifyEntryExists } = require("../../database/db-utils");
const {
  fetchAllUsers,
  postUser,
  fetchUser,
  deleteUser,
} = require("../models/users.models");

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

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  if (isNaN(userId)) {
    return res.status(400).send({ error: "Invalid user ID format." });
  }
  try {
    const user = await fetchUser("users", userId);
    res.status(200).json({ user });
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).send({ error: error.message });
    }
    res.status(500).send({ error: "Failed to Fetch User" });
  }
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  if (isNaN(userId)) {
    return res.status(400).send({ error: "Invalid user ID format." });
  }
  try {
    const userExists = await verifyEntryExists("users", userId);
    if (!userExists) {
      return res
        .status(404)
        .send({ error: `User with ID ${userId} not found.` });
    }
    await deleteUser(userId);
    const users = await fetchAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to Delete User" });
  }
};
