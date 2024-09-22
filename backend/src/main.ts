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
import http, { createServer, Server } from "http";
import cookieParser from "cookie-parser"; // Import the socket handler from the new file
import { socketHandler } from "./presentation/socket/chat";
import { Server as serverSocket} from 'socket.io';
import {checkUserStatusRouter} from "./presentation/MiddleWare/verfiy";

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
app.use('/api', checkUserStatusRouter);

// Create HTTP server and attach the Express app
const httpServer = createServer(app);

// Initialize Socket.IO
export const io = new serverSocket(httpServer, {
  cors: {
    origin: "http://localhost:3000" || '*', // Adjust as needed
    methods: ['GET', 'POST'], // Allowed methods
  },
});

// Call the socket handler to manage socket connections
socketHandler(io);

// Start the server on the correct port
const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
