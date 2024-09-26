import express  from "express";
import { adminlogin, blockCompanyController, blockUserController, DashboardController, getAllcompanyController, getCompanyUnapproval, getReport, getUsersList, unblockCompanyController, unblockUserController, updateCompanyApproval, updateReportStatusController } from "../controllers/adminController";
import adminJwtMiddleware from "../MiddleWare/adminJWT";
import { getAllReports } from "../../Infrastructure/adminRepository";


const router = express.Router();

// Login route for admin
router.post("/login", adminlogin);


router.get("/approval", adminJwtMiddleware, getCompanyUnapproval);

router.put("/approval/:id", adminJwtMiddleware, updateCompanyApproval);

router.get("/getAllUsers", adminJwtMiddleware, getUsersList);
router.put("/blockUser/:id", adminJwtMiddleware, blockUserController);
router.put("/unblockUser/:id", adminJwtMiddleware, unblockUserController);

router.get("/getAllCompanies", adminJwtMiddleware, getAllcompanyController);
router.put("/company/blockUser/:id", adminJwtMiddleware, blockCompanyController);
router.put("/company/unblockUser/:id", adminJwtMiddleware, unblockCompanyController);

router.get("/reports", adminJwtMiddleware, getReport);
router.put("/report/:reportId/status", updateReportStatusController);

router.get("/dashboard", adminJwtMiddleware, DashboardController);



export default router;