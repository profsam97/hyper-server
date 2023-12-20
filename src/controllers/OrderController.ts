// controllers/orderController.ts
import { Request, Response } from 'express';
import * as orderService from '../Services/OrderService'
import { prisma } from '../database';

export const createOrder = async (req: Request, res: Response) => {
  const user = req.user;
  const customerId = user.id;
  try {
    const order = await orderService.createOrder({customerId, ...req.body});
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' + error,  });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id, 10);
  const userId = req.user.id;
  try {
    const isOwner = await prisma.order.findUnique({ where: { id: orderId } });
    if(userId !== isOwner?.customerId) {
      res.status(401).json("You are not permitted to delete this order")
      return;
    }
    await orderService.cancelOrder(orderId);
    res.json({ message: 'Order canceled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error canceling order' });
  }
};

export const getOrdersByCustomerId = async (req: Request, res: Response) => {
  const user = req.user;
  const customerId = user.id;
  try {
    const orders = await orderService.getOrdersByCustomerId(customerId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};
