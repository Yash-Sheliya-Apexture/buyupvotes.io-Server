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
import { register, login, getUserData,updateUserData, refreshAccessToken,resetPassword, forgotPassword,verifyOtpAndResetPassword ,resendResetOtp } from '../controllers/auth.js';
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

router.post('/reset-password', authMiddleware, resetPassword)
router.post('/forgot-password', forgotPassword); // Request OTP
router.post('/resend-reset-otp', resendResetOtp);  // Resend OTP
router.post('/verify-otp-reset-password', verifyOtpAndResetPassword); // Verify OTP and reset password

// Refresh Token Route
router.post('/refresh-token', refreshAccessToken);

// Order Routes (Protected)
router.post('/submit-order', authMiddleware, saveOrderToSheet); // Submit Order Route
router.get('/orders', authMiddleware, getUserOrders); // Get Orders for logged-in user

export default router;
