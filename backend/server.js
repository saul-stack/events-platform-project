const http = require("http");

const port = 9090;

const server = http.createServer((request, response) => {
  console.log(`Server has received a request on port ${port}`);
});

server.listen(port, (error) => {
  if (error) console.log(error);
  else {
    console.log(`Server is listening on port ${port}`);
  }
});
