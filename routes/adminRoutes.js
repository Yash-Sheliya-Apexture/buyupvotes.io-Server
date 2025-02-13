// routes/adminRoutes.js
import express from 'express';
import {getAllUsers, getAllOrders, updateOrder, deleteOrder } from '../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Unauthorized: Admin access required' });
};


// GET all users (Admin only)  -- ADD THIS ROUTE
router.get('/users', authMiddleware, isAdmin, getAllUsers);

// GET all orders (Admin only)
router.get('/orders', authMiddleware, isAdmin, getAllOrders);

// PUT update order status and other charges (Admin only)
router.put('/orders/:orderId', authMiddleware, isAdmin, updateOrder);

// DELETE order (Admin only)
router.delete('/orders/:orderId', authMiddleware, isAdmin, deleteOrder);

export default router;