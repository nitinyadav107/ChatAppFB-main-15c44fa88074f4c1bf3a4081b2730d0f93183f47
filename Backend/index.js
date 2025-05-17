import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import MessageRouter from "./routes/message.route.js";
import geminiRouter from "./routes/gemini.route.js";
import connectCloudinary from './config/cloudinary.js';


const app = express();
dotenv.config();
connectCloudinary();

app.use(cookieParser());
app.use(cors()); // Enable CORS for all routes
app.use(express.json());




const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3010", // Allow frontend URL
    methods: ["GET", "POST"],
  },
});
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
}
const users = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Hello ", users);
  }
  io.emit("getOnlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

const PORT = process.env.PORT || 8000; // Backend runs on port 8000
const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB', error));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/user', router);
app.use('/api/message', MessageRouter);
app.use('/api/ai',geminiRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app, io, server };