import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import socketAuthMiddleware from "../middleware/socket.io.middleware.js";

const app = express();


const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});


io.use(socketAuthMiddleware);


const userMap = {};

io.on("connection", (socket) => {
  const userId = socket.userId;
  userMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userMap));

 
  socket.on("disconnect", () => {
    delete userMap[userId];
    io.emit("getOnlineUsers", Object.keys(userMap));
  });
});

export { io, server, app };
