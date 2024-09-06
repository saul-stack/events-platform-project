const express = require("express");
const PORT = 9090;

const server = express();

server.use((request, response) => {
  const { method, url } = request;
  console.log(`Received a ${method} request on ${url}`);
  response.send(`Received your ${method} request on ${url}. Thank you!`);
});

server.listen(PORT, (error) => {
  if (error) console.log(error);
  else {
    console.log(`Server is listening on port ${PORT}`);
  }
});
