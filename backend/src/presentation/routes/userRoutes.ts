import express from "express";
import {
  getAllTrips,
  googleLoginHandler,
  login,
  register,
  verifyOtp,
} from "../controllers/userController";
import upload from "../../uilts/multer";
import { verifyUser } from "../MiddleWare/userJWT";

const router = express.Router();

router.post("/signup", register);

router.post("/verifyOtp", verifyOtp);

router.post("/login", login);

router.post("/googleLogin", googleLoginHandler); // googleLoginHandler

router.put(
  "/profile",
  verifyUser,
  upload.single("profileImage")
  //   updateProfile
);

router.get("/trips", getAllTrips);

export default router;
