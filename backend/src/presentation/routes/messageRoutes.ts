import express from "express";
import { addMessage, getMessage } from "../controllers/messageController";

const router = express.Router();

router.post("/message", addMessage);
router.get('/message/:chatId', getMessage);



export default router