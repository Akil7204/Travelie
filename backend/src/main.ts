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
import cookieParser from "cookie-parser"; 
import { socketHandler } from "./presentation/socket/chat";
import { Server as serverSocket} from 'socket.io';
import {checkUserStatusRouter} from "./presentation/MiddleWare/verfiy";


dotenv.config();


const app = express();


connectToDatabase();


app.use(
  cors({
    origin: "https://travelie.life",  
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))


app.use('/api/users', userRoutes);
app.use('/company', companyRoutes);
app.use('/admin', adminRoutes);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);
app.use('/api', checkUserStatusRouter);


const httpServer = createServer(app);

export const io = new serverSocket(httpServer, {
  cors: {
    origin: "https://travelie.life" || '*', 
    methods: ['GET', 'POST'], 
  },
});


socketHandler(io);


const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
