import express  from "express";
import { login, register, verifyOtp } from "../controllers/userController";


const router = express.Router();

router.post("/signup", register);
router.post("/verifyOtp", verifyOtp);

router.post("/login", login);

export default router;