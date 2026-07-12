import express from 'express';
import {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderStats,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/stats', protect, admin, getOrderStats);
router.route('/all').get(protect, admin, getAllOrders);
router.route('/:id').get(protect, getOrderById);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
