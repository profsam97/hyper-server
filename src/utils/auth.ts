import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = 'hyper'; 

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string): { userId: number } | null => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: number };
    return decoded;
  } catch (error) {
    return null;
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
 return await bcrypt.compare(password, hashedPassword);
};

export const verifyUserPassword = async (hashedPassword: string, providedPassword: string): Promise<boolean> => {
  return await comparePasswords(providedPassword, hashedPassword);
};