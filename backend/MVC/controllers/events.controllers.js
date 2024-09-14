const { checkIfEntryExistsById } = require("../../database/test-data/db-utils");
const {
  fetchAllEvents,
  postEvent,
  fetchEvent,
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
