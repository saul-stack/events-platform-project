const express = require("express");

const server = express();
const { getAllEndpoints } = require("../MVC/controllers/api.controllers.js");

const rejectRequestMethod = (req, res) => {
  console.log("hi");
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

module.exports = server;
