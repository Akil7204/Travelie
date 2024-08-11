import express  from "express";
import { register, verifyOtp } from "../controllers/userController";


const router = express.Router();

router.post("/signup", register);
router.post("/verifyOtp", verifyOtp);

export default router;