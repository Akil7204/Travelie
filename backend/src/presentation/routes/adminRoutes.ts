import express  from "express";
import { adminlogin, getCompanyUnapproval } from "../controllers/adminController";
import adminJwtMiddleware from "../MiddleWare/adminJWT";


const router = express.Router();

// Login route for admin
router.post("/login", adminlogin);

// company approval route
router.get("/approval", adminJwtMiddleware, getCompanyUnapproval);

router.post("/approval/id");



export default router;