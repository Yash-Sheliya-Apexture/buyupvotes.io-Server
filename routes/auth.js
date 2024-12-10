import express from 'express';
import { register, login, getUserData } from '../controllers/auth.js';
import { saveOrderToSheet } from '../controllers/OrderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';  // Import the auth middleware

const router = express.Router();

// Register and login routes (open to everyone)
router.post('/register', register);
router.post('/login', login);

// Protected route - fetch user data (requires valid JWT)
router.get('/user', authMiddleware, getUserData);

// Order routes
router.post('/submit-order', authMiddleware, saveOrderToSheet);

export default router;
