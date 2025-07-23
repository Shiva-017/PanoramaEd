// ===== UPDATED SERVER.JS =====
// Add help queue socket events to your existing server setup

import express from 'express';
import initialize from './app/app.js';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const port = 3001;

initialize(app);


app.use(cors());
app.listen(port, () => console.log(`server is listening at port ${port}`));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  // Existing chat functionality
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  // NEW: Help queue events
  socket.on("new_help_request", (helpRequest) => {
    console.log("New help request:", helpRequest);
    // Broadcast to all connected mentors
    socket.broadcast.emit("new_help_request", helpRequest);
  });

  socket.on("help_accepted", (acceptedRequest) => {
    console.log("Help accepted:", acceptedRequest);
    // Notify the specific student
    io.emit("help_accepted", acceptedRequest);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(4000, () => {
  console.log("SERVER RUNNING on port 4000");
});