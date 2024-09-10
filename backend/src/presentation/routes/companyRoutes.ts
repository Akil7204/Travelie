import express  from "express";
import { addCategory, addTrip, editTripById, getCategoryById, getCategorysById, getTripById, getTripsById, login, register, verifyOtp } from "../controllers/companyController";
import upload from "../../uilts/multer";
import { verifycompany } from "../MiddleWare/companyJWT";


const router = express.Router();

router.post("/signup", register);
router.post("/verifyOtp", verifyOtp);

router.post("/login", login);

router.get("/trips", verifycompany, getTripsById);
router.post("/addTrip", verifycompany, upload.array("images"), addTrip);
router.get("/editTrip/:id", verifycompany, getTripById);
router.post("/editTrip/:id", verifycompany, upload.array("images"), editTripById);



router.get("/categorys", verifycompany, getCategorysById);
router.post("/addCategory", verifycompany, upload.any(), addCategory);
router.get("/editCategory/:id", verifycompany, getCategoryById);



export default router;