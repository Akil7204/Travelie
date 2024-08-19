import express  from "express";
import { googleLoginHandler, login, register, verifyOtp } from "../controllers/userController";


const router = express.Router();

router.post("/signup", register);

router.post("/verifyOtp", verifyOtp);

router.post("/login", login);

router.post("/googleLogin", googleLoginHandler); // googleLoginHandler

export default router;