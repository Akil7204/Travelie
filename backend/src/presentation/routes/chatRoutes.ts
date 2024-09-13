import express from "express";
import { verifyUser } from "../MiddleWare/userJWT";
import { verifycompany } from "../MiddleWare/companyJWT";

const router = express.Router();


