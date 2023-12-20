import { prisma } from '../database';
import { Order } from '../entities/Order';

export const createOrder = async (orderData: Omit<Order, 'id'>): Promise<Order> => {
  return prisma.order.create({ data: orderData });
};

export const cancelOrder = async (orderId: number): Promise<void> => {
  await prisma.order.update({ where: { id: orderId }, data: { canceled: true } });
};

export const getOrdersByCustomerId = async (customerId: number): Promise<Order[]> => {
  return prisma.order.findMany({ where: { customerId } });
};
