import { prisma } from '../database';
import { User } from '../entities/User';

export const createUser = async (userData: Omit<User, 'id' | 'points'>): Promise<User> => {
  return prisma.user.create({ data: { ...userData, points: 100 } });
};

export const updateUserPoints = async (userId: number, newPoints: number): Promise<void> => {
  await prisma.user.update({ where: { id: userId }, data: { points: newPoints } });
};

export const getUserById = async (userId: number): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id: userId } });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};
