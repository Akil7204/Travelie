import express  from "express";
import { getAllTrips, googleLoginHandler, login, register, verifyOtp } from "../controllers/userController";


const router = express.Router();

router.post("/signup", register);

router.post("/verifyOtp", verifyOtp);

router.post("/login", login);

router.post("/googleLogin", googleLoginHandler); // googleLoginHandler

router.get("/trips", getAllTrips);

export default router;