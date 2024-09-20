// main.ts or index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDatabase } from "./config";
import userRoutes from "./presentation/routes/userRoutes";
import companyRoutes from "./presentation/routes/companyRoutes";
import adminRoutes from "./presentation/routes/adminRoutes";
import chatRoutes from "./presentation/routes/chatRoutes";
import messageRoutes from "./presentation/routes/messageRoutes";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cookieParser from "cookie-parser"; // Import the socket handler from the new file
import { socketHandler } from "./presentation/socket/chat";

// Load environment variables
dotenv.config();

// Initialize the express application
const app = express();

// Connect to the database
connectToDatabase();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",  // Your frontend origin
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

// Create HTTP server and attach the Express app
const server = http.createServer(app);

// Create WebSocket server and attach it to the HTTP server
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",  // Frontend origin
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Call the socket handler to manage socket connections
socketHandler(io);

// Start the server on the correct port
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
