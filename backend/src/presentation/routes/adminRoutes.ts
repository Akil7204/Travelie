import express  from "express";
import { adminlogin, blockCompanyController, blockUserController, getAllcompanyController, getCompanyUnapproval, getUsersList, unblockCompanyController, unblockUserController, updateCompanyApproval } from "../controllers/adminController";
import adminJwtMiddleware from "../MiddleWare/adminJWT";


const router = express.Router();

// Login route for admin
router.post("/login", adminlogin);

// company approval route
router.get("/approval", adminJwtMiddleware, getCompanyUnapproval);

router.put("/approval/:id", adminJwtMiddleware, updateCompanyApproval);

router.get("/getAllUsers", adminJwtMiddleware, getUsersList);
router.put("/blockUser/:id", adminJwtMiddleware, blockUserController);
router.put("/unblockUser/:id", adminJwtMiddleware, unblockUserController);

router.get("/getAllCompanies", adminJwtMiddleware, getAllcompanyController);
router.put("/company/blockUser/:id", adminJwtMiddleware, blockCompanyController);
router.put("/company/unblockUser/:id", adminJwtMiddleware, unblockCompanyController);

export default router;