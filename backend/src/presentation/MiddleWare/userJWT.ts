import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../domain/user";

export async function verifyUser(req: any, res: Response, next: NextFunction) {
  const Token = req.cookies?.token;
  console.log(Token);
  
  if (!Token) {
    return res.status(401).json("JWT not found in the cookies");
  }

  const secret = process.env.JWT_SECRET_KEY || "";
  if (!secret) {
    return res.status(500).json("JWT secret not found in the env");
  }

  try {
    const decoded: any = jwt.verify(Token, secret);
    req.userId = decoded?.userId;

   
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json("User not found");
    }

   
    if (user.isBlocked) {
      return res.status(403).json("User is blocked");
    }

    next();
  } catch (err: any) {
    console.error(err);
    return res.status(401).send("Invalid JWT");
  }
}
