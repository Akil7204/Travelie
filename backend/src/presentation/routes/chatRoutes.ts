import express from "express";
import { companyChat, createChat, findChat, userChat } from "../controllers/chatController";

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", userChat);
router.get("/find/:firstId/:secondId", findChat);

//company routes;

router.get("/company/:companyId", companyChat);




export default router;
