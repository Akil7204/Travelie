import express  from "express";
import { adminlogin } from "../controllers/adminController";


const router = express.Router();

router.post("/login", adminlogin);



export default router;