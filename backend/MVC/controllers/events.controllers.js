const { checkIfEntryExistsById } = require("../../database/test-data/db-utils");
const {
  fetchAllEvents,
  postNewEvent,
  fetchEventById,
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
    await postNewEvent(req.body);
    const events = await fetchAllEvents();
    res.status(201).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to Post Event" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await fetchEventById(eventId);
    return res.status(200).json({ event });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to Fetch Event" });
  }
};
