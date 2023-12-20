import * as userRepository from '../repositories/userRepository';
import { User } from '../entities/User';

export const createUser = async (userData: Omit<User, 'id' | 'points'>): Promise<User> => {
  return userRepository.createUser(userData);
};

export const updateUserPoints = async (userId: number, newPoints: number): Promise<void> => {
  return userRepository.updateUserPoints(userId, newPoints);
};

export const getUserById = async (userId: number): Promise<User | null> => {
  return userRepository.getUserById(userId);
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return userRepository.getUserByEmail(email);
};

// export const verifyUserPassword = async (user: User, password: string): Promise<boolean> => {
//   return user.password === password;
// };
