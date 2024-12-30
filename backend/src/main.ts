import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDatabase } from "./config";
import userRoutes from "./presentation/routes/userRoutes";
import companyRoutes from "./presentation/routes/companyRoutes";
import adminRoutes from "./presentation/routes/adminRoutes";
import chatRoutes from "./presentation/routes/chatRoutes";
import messageRoutes from "./presentation/routes/messageRoutes";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import { socketHandler } from "./presentation/socket/chat";
import { Server as serverSocket } from 'socket.io';
import morgan from 'morgan';

dotenv.config();

const app = express();
app.use(morgan('dev'));

connectToDatabase();

// app.use((req, res, next) => {
//   res.setHeader('Set-Cookie', 'token=your-token-value; Path=/; HttpOnly; Secure; SameSite=None');
//   next();
// });

// const allowedOrigins = [
//   "https://www.travelie.life",
//   "https://travelie.life",
//   "https://travelie.vercel.app/",
//   "http://localhost:3000",
//   "https://test.payu.in",
//   "*"
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       console.log(origin);
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true); 
//       } else {
//         callback(new Error("Not allowed by CORS")); 
//       }
//     },
//     credentials: true, 
//   })
// );

const allowedOrigins = [
  "https://www.travelie.life",
  "https://travelie.life",
  "https://travelie.vercel.app",
  "http://localhost:3000",
  "https://test.payu.in",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Accept the origin
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS")); // Reject the origin
    }
  },
  credentials: true, // Enable cookies and credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const httpServer = createServer(app);

export const io = new serverSocket(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true, // Include credentials for WebSocket connections
  },
});


socketHandler(io);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use('/v1/api/users', userRoutes);
app.use('/v1/api/company', companyRoutes);
app.use('/v1/api/admin', adminRoutes);
app.use('/v1/api/chat', chatRoutes);
app.use('/v1/api/message', messageRoutes);

// app.use('/users', userRoutes);
// app.use('/company', companyRoutes);
// app.use('/admin', adminRoutes);
// app.use('/chat', chatRoutes);
// app.use('/message', messageRoutes);


const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});