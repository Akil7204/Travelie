import express  from "express";
import { adminlogin, getCompanyUnapproval } from "../controllers/adminController";


const router = express.Router();

// Login route for admin
router.post("/login", adminlogin);

// company approval route
router.get("/approval", getCompanyUnapproval)



export default router;