// import express from 'express';
// import { register, login, getUserData } from '../controllers/auth.js';
// import { saveOrderToSheet } from '../controllers/OrderController.js';
// import authMiddleware from '../middlewares/authMiddleware.js';  // Import the auth middleware

// const router = express.Router();

// // Register and login routes (open to everyone)
// router.post('/register', register);
// router.post('/login', login);

// // Protected route - fetch user data (requires valid JWT)
// router.get('/user', authMiddleware, getUserData);

// // Order routes
// router.post('/submit-order', authMiddleware, saveOrderToSheet);

// export default router;


import express from 'express';
import { register, login, getUserData,updateUserData, refreshAccessToken, forgotPassword,resetPassword } from '../controllers/auth.js';
import { saveOrderToSheet, getUserOrders } from '../controllers/OrderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';  // Import the auth middleware

const router = express.Router();

// Open Routes
router.post('/register', register); // Registration route
router.post('/login', login); // Login route

// Protected Route - Get User Data
router.get('/user', authMiddleware, getUserData);
// Protected Route - Update User Data
router.put('/user', authMiddleware, updateUserData); // Update user data route

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', authMiddleware, resetPassword);

// Refresh Token Route
router.post('/refresh', refreshAccessToken);

// Order Routes (Protected)
router.post('/submit-order', authMiddleware, saveOrderToSheet); // Submit Order Route
router.get('/orders', authMiddleware, getUserOrders); // Get Orders for logged-in user

export default router;
