import express from "express";
import { verifyUser } from "../MiddleWare/userJWT";
import { verifycompany } from "../MiddleWare/companyJWT";
import { createChat, findChat, userChat } from "../controllers/chatController";

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", userChat);
router.get("/find/:firstId/:secondId", findChat)




export default router;
