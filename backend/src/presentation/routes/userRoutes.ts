import express from "express";
import {
  addTransaction,
  bookingSeat,
  cancelTrip,
  detailTrip,
  fetchBookedData,
  fetchWalletDetails,
  getAllTrips,
  getUnreadMessagesCount,
  getUserBookings,
  googleLoginHandler,
  handleReportSubmit,
  login,
  payment,
  register,
  saveData,
  updateProfile,
  verifyOtp,
  walletSaveData,
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

router.get("/bookings", verifyUser, getUserBookings);

router.post('/cancel-trip/:bookingId', verifyUser, cancelTrip);

router.get("/wallet/:userId", verifyUser, fetchWalletDetails);

router.post("/report", verifyUser, handleReportSubmit);

router.get('/unread-count',verifyUser, getUnreadMessagesCount);

// Payment Routes;
router.post('/payment', verifyUser, payment);
router.post('/addTransaction',  addTransaction );
router.post('/response/saveData', saveData);
router.post('/walletPayment', walletSaveData)
































export default router;
