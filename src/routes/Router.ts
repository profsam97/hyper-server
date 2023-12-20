import express, {Router} from "express";
import {authenticateToken} from '../middleware/auth'
import {signin, signup} from "../controllers/userController";
import { createBook, getAllBooks, getBookById } from "../controllers/bookController";
import { cancelOrder, createOrder, getOrdersByCustomerId } from "../controllers/OrderController";
const router : Router = express.Router();

// Authentication Routes
router.post('/user/signin',  signin);
router.post('/user/signup',   signup);

// books route

router.get('/books', getAllBooks);
router.get('/book/:id', getBookById)
router.post('/book', createBook);

// Order Route
router.get('/orders', authenticateToken, getOrdersByCustomerId);
router.post('/order', authenticateToken, createOrder);
router.delete('/ordercancel/:id', authenticateToken, cancelOrder)


export default router;