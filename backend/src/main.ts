import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDatabase } from "./config";
import userRoutes from "./presentation/routes/userRoutes";
import companyRoutes from "./presentation/routes/companyRoutes";
import adminRoutes from "./presentation/routes/adminRoutes";
import chatRoutes from "./presentation/routes/chatRoutes";
import messageRoutes from "./presentation/routes/messageRoutes";

import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

connectToDatabase();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
// app.use(bodyParser.json());
app.use(cookieParser())

app.use('/api/users', userRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
