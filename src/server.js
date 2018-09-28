const express = require("express");
const http = require("http");
const socket = require("socket.io");
const port = process.env.PORT || 4001;

const app = express();

const server = http.createServer(app);

const io = socket(server);

io.on("connection", socket => {
  console.log(`New client connected: ${socket.id}`)

  socket.on("post", userData => {
    console.log(userData);
    socket.broadcast.emit("post", userData);
  });

});

server.listen(port, () => console.log(`Listening on port ${port}`));