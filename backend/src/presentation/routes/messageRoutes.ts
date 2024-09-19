import express from "express";
import { addMessage, companyAddMessage, getMessage } from "../controllers/messageController";

const router = express.Router();

router.post("/message", addMessage);
router.get('/message/:chatId', getMessage);


// company side;
router.post("/company/message", companyAddMessage)



export default router