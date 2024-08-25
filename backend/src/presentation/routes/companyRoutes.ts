import express  from "express";
import { addTrip, login, register, verifyOtp } from "../controllers/companyController";
import upload from "../../uilts/multer";


const router = express.Router();

router.post("/signup", register);
router.post("/verifyOtp", verifyOtp);

router.post("/login", login);
router.post("/addTrip", upload.single("photos"), addTrip);


export default router;