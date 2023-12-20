import { Request, Response, NextFunction } from 'express';
import * as authUtils from '../utils/auth';
import * as userService from '../Services/userService'
import { User } from '../entities/User';
export const authenticateToken = async(req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const decodedToken = authUtils.verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Attach user ID to request for further use
  req.user = await  userService.getUserById(decodedToken.userId) as User;

  next();
};
