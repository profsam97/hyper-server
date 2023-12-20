import { Request, Response } from 'express';
import * as userService from '../Services/userService';
import * as authUtils from '../utils/auth';

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userService.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    const hashedPassword = await authUtils.hashPassword(password);
    const newUser = await userService.createUser({
      name,
      password: hashedPassword,
      email,
    });
    const token = authUtils.generateToken(newUser.id);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error signing up' });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify the provided password against the stored hashed password
    const isPasswordValid = await authUtils.verifyUserPassword(user.password, password);
    // Check if the password is valid
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = authUtils.generateToken(user.id);

    res.json({ token });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Error signing in' });
  }
};