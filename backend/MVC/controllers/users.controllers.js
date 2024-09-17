const {
  verifyExists,
  verifyValidEmailAddress,
  hasDuplicates,
  fetchValidEventIds,
} = require("../../database/db-utils");
const {
  fetchAllUsers,
  postUser,
  fetchUser,
  deleteUser,
  patchUser,
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
  const { events_watched, events_booked } = req.body;

  console.log(events_watched, "<<<<<<here");

  try {
    if (Array.isArray(events_watched)) {
      if (hasDuplicates(events_watched)) {
        return res
          .status(400)
          .send({ error: "Refused: Duplicate Events Values." });
      }

      const validEventIds = await fetchValidEventIds();
      const eventsToCheck = events_watched;

      const allEventsValid = eventsToCheck.every((eventId) =>
        validEventIds.includes(eventId)
      );
      if (!allEventsValid) {
        return res.status(400).send({
          error: `Refused: events_watched contains non-existant event ids.`,
        });
      }
    }

    if (Array.isArray(events_booked)) {
      if (hasDuplicates(events_booked)) {
        return res
          .status(400)
          .send({ error: "Refused: Duplicate Events Values." });
      }
      const validEventIds = await fetchValidEventIds();
      const eventsToCheck = events_watched;

      const allEventsValid = eventsToCheck.every((eventId) =>
        validEventIds.includes(eventId)
      );
      if (!allEventsValid) {
        return res.status(400).send({
          error: `Refused: events_watched contains non-existant event ids.`,
        });
      }
    }

    await postUser(req.body);
    res.status(201).json({
      message: `User posted successfully: ${req.body.title}`,
    });
  } catch (error) {
    console.error(error);
    if (error.code === "08P01") {
      return res.status(400).send({ error: "Invalid Request Format." });
    }
    if (error.code === "23505") {
      const detail = error.detail;
      let violatedProperty = detail.match(/\(([^)]+)\)/)[1];

      if (violatedProperty === "email") violatedProperty = "email address";
      if (violatedProperty === "user_name") violatedProperty = "username";

      return res
        .status(400)
        .send({ error: `User with this ${violatedProperty} already exists.` });
    }
    res.status(500).send({ error: "Failed to Post User" });
  }
};

exports.patchUserById = async (req, res) => {
  const userId = req.params.id;
  const patchObject = req.body;
  const propertyToPatch = Object.keys(req.body)[0];
  const valueToPatch = patchObject[propertyToPatch];

  const { events_watched, events_booked } = req.body;
  if (
    (propertyToPatch === "events_watched" ||
      propertyToPatch === "events_booked") &&
    Array.isArray(valueToPatch)
  ) {
    const validEventIds = await fetchValidEventIds();
    const eventsToCheck = valueToPatch;

    const allEventsValid = eventsToCheck.every((eventId) =>
      validEventIds.includes(eventId)
    );
    if (!allEventsValid) {
      return res.status(400).send({
        error: `Refused: ${propertyToPatch} contains non-existant event ids.`,
      });
    }
  }
  ////if propertyToPatch is events_watched or events_booked, check whether all the values in events_watched and events_booked are found as ids in the events table

  if (Array.isArray(events_watched)) {
    if (hasDuplicates(events_watched)) {
      return res
        .status(400)
        .send({ error: "Refused: Duplicate Events Values." });
    }
  }

  if (Array.isArray(events_booked)) {
    if (hasDuplicates(events_booked)) {
      return res
        .status(400)
        .send({ error: "Refused: Duplicate Events Values." });
    }
  }

  if (Array.isArray(patchObject) || typeof patchObject !== "object") {
    return res.status(400).send({ error: "Invalid patch format." });
  }

  if (Object.keys(patchObject).length > 1) {
    return res.status(400).send({ error: "Invalid patch format." });
  }

  if (propertyToPatch === "id") {
    return res
      .status(400)
      .send({ error: "Request refused - Patching ID is disallowed." });
  }

  try {
    if (propertyToPatch === "email") {
      const emailIsValid = await verifyValidEmailAddress(patchObject.email);
      if (!emailIsValid) {
        return res.status(400).send({ error: "Invalid email address." });
      }
    }
    if (isNaN(userId)) {
      return res.status(400).send({ error: "Invalid user ID format." });
    }
    const user = await fetchUser("users", userId);
    const oldUsername = user.user_name;
    await patchUser(userId, patchObject);
    res.status(200).json({
      message: `User #${userId} (${oldUsername}) updated ${propertyToPatch} to '${patchObject[propertyToPatch]}' successfully.`,
    });
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).send({ error: error.message });
    }
    if (Number(error.code) === 42703) {
      if (propertyToPatch === undefined) {
        return res.status(400).send({ error: "Invalid patch format." });
      }
      return res
        .status(400)
        .send({ error: `Invalid property: ${propertyToPatch}.` });
    }
    if (error.code === "22P02" || error.code === "22007") {
      return res.status(400).send({ error: "Invalid patch value datatype." });
    }
    if (error.message === "Invalid email address") {
      return res.status(400).send({ error: "Invalid email address." });
    }

    if (error.code === "23505") {
      const detail = error.detail;
      let violatedProperty = detail.match(/\(([^)]+)\)/)[1];

      if (violatedProperty === "email") violatedProperty = "email address";
      if (violatedProperty === "user_name") violatedProperty = "username";

      return res
        .status(400)
        .send({ error: `User with this ${violatedProperty} already exists.` });
    }

    console.error(error);
    res.status(500).send({ error: "Failed to update user" });
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
    const userExists = await verifyExists("users", userId);
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
