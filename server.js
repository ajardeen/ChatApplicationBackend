const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db.js");
const UserRoute = require("./routes/UserRoute.js");
const ChatRoute = require("./routes/ChatRoute.js");
const Message = require("./models/Message.js");
require("dotenv").config();

// Import HTTP and Socket.io
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", UserRoute);
app.use("/api/chat", ChatRoute);

// Connect to MongoDB
connectDB();

// Create an HTTP Server for WebSockets
const server = http.createServer(app);

// Attach Socket.io to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Change to your frontend URL in production
    methods: ["GET", "POST"],
  },
});

// WebSocket Connection
io.on("connection", (socket) => {


  // Handle Incoming Messages
  socket.on("sendMessage", async (data) => {
    try {
      const { sender, receiver, message } = data;
      const newMessage = new Message({ sender, receiver, message });
      await newMessage.save();

      // Send message to all users
      io.emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Handle User Disconnection
  socket.on("disconnect", () => {
    console.log("User Disconnected: ", socket.id);
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
