import express  from "express";
import { addTrip, login, register, verifyOtp } from "../controllers/companyController";
import upload from "../../uilts/multer";
import { verifycompany } from "../MiddleWare/companyJWT";


const router = express.Router();

router.post("/signup", register);
router.post("/verifyOtp", verifyOtp);

router.post("/login", login);
router.post("/addTrip", verifycompany, upload.array("images"), addTrip);


export default router;