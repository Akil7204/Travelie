import { Request, Response, NextFunction } from 'express';
import { loginUser } from '../../application/adminService';


export const adminlogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;
  try {
    const result = await loginUser(email, password);
    console.log(result);
    
    if (result) {
      res.json({ token: result.token, admin: result.admin });
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    next(error);
  }
};