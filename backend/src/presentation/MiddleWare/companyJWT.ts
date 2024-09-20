import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifycompany(req: any, res: Response, next: NextFunction) {
    
  const companyToken = req.cookies?.companyToken;
    console.log(companyToken);
    
  if (!companyToken) {
    return res.status(401).send("JWT not found in the cookies");
  }

  const secret = process.env.JWT_SECRET_KEY || "";
  if (!secret) {
    return res.status(500).json("JWT secret not found in the env");
  }

  try {
    const decoded: any = jwt.verify(companyToken, secret);
    req.companyId = decoded?.companyId;
    
    // if (!decoded?.role || decoded.role != "Travelie-company") {
    //   return res.status(401).send("Invalid JWT");
    // }
    
    next();
  } catch (err: any) {
    console.log(err);
    
    return res.status(401).send("Invalid JWT");
  }
}