import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDatabase } from "./config";
import userRoutes from "./presentation/routes/userRoutes";
import companyRoutes from "./presentation/routes/companyRoutes"

dotenv.config();

const app = express();

connectToDatabase();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/company', companyRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
