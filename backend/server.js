const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join_chat", (username) => {
    users.push({
      id: socket.id,
      username,
    });

    io.emit("users_online", users.length);

    io.emit("receive_message", {
      system: true,
      text: `${username} joined the chat`,
      time: new Date().toLocaleTimeString(),
    });
  });

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    const user = users.find((u) => u.id === socket.id);

    if (user) {
      io.emit("receive_message", {
        system: true,
        text: `${user.username} left the chat`,
        time: new Date().toLocaleTimeString(),
      });

      users = users.filter((u) => u.id !== socket.id);

      io.emit("users_online", users.length);
    }

    console.log("Disconnected:", socket.id);
  });
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});