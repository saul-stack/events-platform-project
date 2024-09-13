const express = require("express");

const server = express();
const { getAllEndpoints } = require("../MVC/controllers/api.controllers.js");
const { getAllEvents } = require("../MVC/controllers/events.controllers.js");

const rejectRequestMethod = (req, res) => {
  const METHOD = req.method;
  const ENDPOINT = req.originalUrl;
  console.error(` ${METHOD} Method Not Allowed on ${ENDPOINT}`);
  return res
    .status(405)
    .json({ error: `${METHOD} Method Not Allowed on ${ENDPOINT}` });
};

server.get("/api", getAllEndpoints);
server.delete("/api", rejectRequestMethod);
server.put("/api", rejectRequestMethod);
server.post("/api", rejectRequestMethod);
server.patch("/api", rejectRequestMethod);

server.get("/api/events", getAllEvents);
server.delete("/api/events", rejectRequestMethod);
server.put("/api/events", rejectRequestMethod);
server.patch("/api/events", rejectRequestMethod);

module.exports = server;
