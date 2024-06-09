const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: ["https://www.rise-sport.eu", "http://localhost:3000"],
    methods: ["GET", "POST"]
  }
});

/* app.get('/', (req, res) => {
  res.send('<h1>Rise Sport</h1>');
}); */

io.on('connection', (socket) => {
  //console.log('a user connected');
  socket.on('disconnect', () => {
    //console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('typing', (data)=>{
    if(data.typing==true)
       io.emit('typing', data)
    else
       io.emit('typing', data)
  });
});

io.engine.on("connection_error", (err) => {
  console.log(err.req);      // the request object
  console.log(err.code);     // the error code, for example 1
  console.log(err.message);  // the error message, for example "Session ID unknown"
  console.log(err.context);  // some additional error context
});

server.listen(8888, () => {
  console.log('listening on *:8888');
});