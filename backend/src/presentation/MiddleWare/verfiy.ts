import express, { Request, Response } from 'express';
import { UserModel } from '../../domain/user';

const router = express.Router();

router.get('/isBlockedApi/:userId', async (req: Request, res: Response) => {
  const  userId  = req.params.userId;
console.log(userId);

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ isBlocked: user.isBlocked });
  } catch (error) {
    console.error("Error fetching user blocked status:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export { router as checkUserStatusRouter };
