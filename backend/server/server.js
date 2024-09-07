const express = require("express");

const server = express();
const { getAllEndpoints } = require("../MVC/controllers/api.controllers.js");

server.get("/api", getAllEndpoints);
module.exports = server;
