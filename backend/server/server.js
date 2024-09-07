const express = require("express");

const server = express();

server.use((request, response) => {
  const { method, url } = request;
  response.send({
    message: `Received your ${method} request on ${url}`,
  });
});

module.exports = server;
