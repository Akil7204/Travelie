import express  from "express";
import { addTrip, getTripById, getTripsById, login, register, verifyOtp } from "../controllers/companyController";
import upload from "../../uilts/multer";
import { verifycompany } from "../MiddleWare/companyJWT";


const router = express.Router();

router.post("/signup", register);
router.post("/verifyOtp", verifyOtp);

router.post("/login", login);

router.get("/trips", verifycompany, getTripsById);
router.post("/addTrip", verifycompany, upload.array("images"), addTrip);
router.get("/editTrip/:id", verifycompany, getTripById);


export default router;