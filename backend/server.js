const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

const FRONTEND_URL =
  process.env.FRONTEND_URL || "https://chatboxis-2.onrender.com";

app.use(express.json());

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Chatbox Backend is Running Successfully!",
  });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
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

const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});