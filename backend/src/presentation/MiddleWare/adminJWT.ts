import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  admin?: string;
  AdminEmail?: string;
}

const adminJwtMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      AdminEmail: string;
    };

    req.AdminEmail = decoded.AdminEmail;

    if (req.AdminEmail !== process.env.Admin_email) {
      return res.status(403).json({ error: "User is not an admin" });
    }

    next();
  } catch (error) {
    console.log(error);

    return res.status(403).json({ error: "Failed to authenticate token" });
  }
};

export default adminJwtMiddleware;
