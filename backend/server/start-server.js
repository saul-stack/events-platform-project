const server = require("./server");
const PORT = 9090;

server.listen(PORT, (error) => {
  if (error) console.log(error);
  else {
    console.log(`Server is listening on port ${PORT}`);
  }
});