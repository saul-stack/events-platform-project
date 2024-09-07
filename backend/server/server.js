const express = require("express");

const server = express();

server.use((request, response) => {
  const { method, url } = request;
  console.log(`Received a ${method} request on ${url}`);
  response.send(`Received your ${method} request on ${url}. Thank you!`);
});

module.exports = server;
