import express from 'express';
import {
  createOrder,
  createPaymentIntent,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  getOrderById
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getOrders);

router.get('/myorders', protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrderById);

router.post('/:id/payment', protect, createPaymentIntent);
router.put('/:id/pay', protect, updateOrderToPaid);

export default router;
