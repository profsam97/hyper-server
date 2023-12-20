import * as orderRepository from '../repositories/OrderRepository';
import { Order } from '../entities/Order';
import * as userService from '../Services/userService';
import * as bookService from '../Services/bookService';

export const createOrder = async (orderData: Omit<Order, 'id'>): Promise<Order> => {
  const { bookId, customerId } = orderData;

  try {
    const user = await userService.getUserById(customerId);

    if (!user) {
      throw new Error('User not found');
    }

    const book = await bookService.getBookById(bookId);

    if (!book) {
      throw new Error('Book not found');
    }

    const bookPoints = book.points;

    if (user.points < bookPoints) {
      throw new Error('Insufficient points to buy this book');
    }

    const newPoints = user.points - bookPoints;
    await userService.updateUserPoints(customerId, newPoints);

    return orderRepository.createOrder(orderData);
  } catch (error) {
    throw new Error('Error creating order: ' + error);
  }
};

export const cancelOrder = async (orderId: number): Promise<void> => {
  return orderRepository.cancelOrder(orderId);
};

export const getOrdersByCustomerId = async (customerId: number): Promise<Order[]> => {
  return orderRepository.getOrdersByCustomerId(customerId);
};
