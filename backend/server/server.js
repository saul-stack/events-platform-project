const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { getAllEndpoints } = require("../MVC/controllers/api.controllers.js");
const { postToEvents } = require("../MVC/controllers/events.controllers.js");
const {
  getAllEvents,
  getEventById,
  deleteEventById,
  patchEventById,
} = require("../MVC/controllers/events.controllers.js");

const rejectRequestMethod = (req, res) => {
  const METHOD = req.method;
  const ENDPOINT = req.originalUrl;
  console.error(` ${METHOD} Method Not Allowed on ${ENDPOINT}`);
  return res
    .status(405)
    .json({ error: `${METHOD} Method Not Allowed on ${ENDPOINT}` });
};

const server = express();

server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get("/api", getAllEndpoints);
server.delete("/api", rejectRequestMethod);
server.put("/api", rejectRequestMethod);
server.post("/api", rejectRequestMethod);
server.patch("/api", rejectRequestMethod);

server.get("/api/events", getAllEvents);
server.post("/api/events", postToEvents);
server.delete("/api/events", rejectRequestMethod);
server.put("/api/events", rejectRequestMethod);
server.patch("/api/events", rejectRequestMethod);

server.get("/api/events/:id", getEventById);
server.delete("/api/events/:id", deleteEventById);
server.patch("/api/events/:id", patchEventById);
server.post("/api/events/:id", rejectRequestMethod);
server.put("/api/events/:id", rejectRequestMethod);

module.exports = server;
