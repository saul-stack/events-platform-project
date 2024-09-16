const { verifyExists } = require("../../database/db-utils");
const {
  fetchAllEvents,
  postEvent,
  fetchEvent,
  deleteEvent,
  patchEvent,
} = require("../models/events.models");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await fetchAllEvents();
    res.status(200).json({ events: events });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to Fetch Events" });
  }
};

exports.postToEvents = async (req, res) => {
  try {
    await postEvent(req.body);
    const events = await fetchAllEvents();
    res.status(201).json({
      message: `Event posted successfully: ${req.body.title}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to Post Event" });
  }
};

exports.getEventById = async (req, res) => {
  const eventId = req.params.id;
  if (isNaN(eventId)) {
    return res.status(400).send({ error: "Invalid event ID format." });
  }
  try {
    const event = await fetchEvent("events", eventId);
    res.status(200).json({ event });
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).send({ error: error.message });
    }
    res.status(500).send({ error: "Failed to Fetch Event" });
  }
};

exports.deleteEventById = async (req, res) => {
  const eventId = req.params.id;
  if (isNaN(eventId)) {
    return res.status(400).send({ error: "Invalid event ID format." });
  }
  try {
    const eventExists = await verifyExists("events", eventId);
    if (!eventExists) {
      return res
        .status(404)
        .send({ error: `Event with ID ${eventId} not found.` });
    }
    await deleteEvent(eventId);
    const events = await fetchAllEvents();
    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to Delete Event" });
  }
};

exports.patchEventById = async (req, res) => {
  const eventId = req.params.id;
  const patchObject = req.body;

  if (Array.isArray(patchObject) || typeof patchObject !== "object") {
    return res.status(400).send({ error: "Invalid patch format." });
  }

  if (Object.keys(patchObject).length > 1) {
    return res.status(400).send({ error: "Invalid patch format." });
  }

  const propertyToPatch = Object.keys(req.body)[0];

  if (propertyToPatch === "id") {
    return res
      .status(400)
      .send({ error: "Request refused - Patching ID is disallowed." });
  }

  try {
    if (isNaN(eventId)) {
      return res.status(400).send({ error: "Invalid event ID format." });
    }

    const event = await fetchEvent("events", eventId);
    const oldTitle = event.title;
    await patchEvent(eventId, patchObject);
    res.status(200).json({
      message: `Event #${eventId} (${oldTitle}) updated ${propertyToPatch} to '${patchObject[propertyToPatch]}' successfully.`,
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
    console.error(error);
    res.status(500).send({ error: "Failed to update event" });
  }
};
