import express from "express";
import {
  bookingSeat,
  detailTrip,
  fetchBookedData,
  getAllTrips,
  googleLoginHandler,
  login,
  register,
  updateProfile,
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
  upload.single("file"),
  updateProfile
);

router.get("/trips", getAllTrips);

router.get("/trips/:id", detailTrip);

router.post("/bookingSeat", verifyUser, upload.none(), bookingSeat);

router.get("/bookedTrip/:id", verifyUser, fetchBookedData);

export default router;
