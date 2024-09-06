const http = require("http");
const port = 9090;

const server = http.createServer((request, response) => {
  const requestUrl = request.url;
  const requestMethod = request.method;
  console.log(`Received a ${requestMethod} request on ${port}${requestUrl}`);
  response.setHeader("Content-Type", "application/json");
  response.statusCode = 200;
  response.write(
    JSON.stringify({ endpoint: request.url, method: request.method })
  );
  response.end();
});

server.listen(port, (error) => {
  if (error) console.log(error);
  else {
    console.log(`Server is listening on port ${port}`);
  }
});
