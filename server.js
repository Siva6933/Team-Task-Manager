const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/userRoutes"

);

const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

app.use("/api/projects",projectRoutes);

app.use("/api/users",userRoutes);

app.use("/api/tasks", (req, res, next) => {
  req.io = io;
  next();
}, taskRoutes);

io.on("connection", (socket) => {

  console.log("User Connected");

  socket.on("disconnect", () => {

    console.log("User Disconnected");

  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});