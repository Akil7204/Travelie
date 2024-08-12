import express  from "express";
import { register } from "../controllers/companyController";


const router = express.Router();

router.post("/signup", register);

export default router;