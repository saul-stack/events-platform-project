const { checkIfEntryExistsById } = require("../../database/test-data/db-utils");
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
    res.status(201).json({ events });
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
    const event = await fetchEvent(eventId);
    res.status(200).json({ event });
  } catch (error) {
    console.log(error.status);
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
    const eventExists = await checkIfEntryExistsById("events", eventId);
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
  try {
    if (isNaN(eventId)) {
      return res.status(400).send({ error: "Invalid event ID format." });
    }
    await patchEvent(eventId, req.body);

    propertyToPatch = Object.keys(req.body)[0];

    const event = await fetchEvent(eventId);
    const eventTitle = event.title;
    res.status(200).json({
      message: `Event #${eventId} (${eventTitle}) updated ${propertyToPatch} to ${req.body[propertyToPatch]} successfully.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to Patch Event" });
  }
};
