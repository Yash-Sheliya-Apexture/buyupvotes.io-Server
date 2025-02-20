// // routes/adminRoutes.js
// import express from 'express';
// import {getAllUsers, getAllOrders, updateOrder, deleteOrder } from '../controllers/adminController.js';
// import authMiddleware from '../middlewares/authMiddleware.js';

// const router = express.Router();

// // Middleware to check if the user is an admin
// const isAdmin = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//         return next();
//     }
//     return res.status(403).json({ message: 'Unauthorized: Admin access required' });
// };


// // GET all users (Admin only)  -- ADD THIS ROUTE
// router.get('/users', authMiddleware, isAdmin, getAllUsers);

// // GET all orders (Admin only)
// router.get('/orders', authMiddleware, isAdmin, getAllOrders);

// // PUT update order status and other charges (Admin only)
// router.put('/orders/:orderId', authMiddleware, isAdmin, updateOrder);

// // DELETE order (Admin only)
// router.delete('/orders/:orderId', authMiddleware, isAdmin, deleteOrder);

// export default router;


// // routes/adminRoutes.js
// import express from 'express';
// import {getAllUsers, getAllOrders, updateOrder, deleteOrder, getUser ,getUserOrders } from '../controllers/adminController.js';
// import authMiddleware from '../middlewares/authMiddleware.js';

// const router = express.Router();

// // Middleware to check if the user is an admin
// const isAdmin = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//         return next();
//     }
//     return res.status(403).json({ message: 'Unauthorized: Admin access required' });
// };

// // GET a specific user
// router.get('/users/:userId', authMiddleware, isAdmin, getUser);

// // GET all users (Admin only)
// router.get('/users', authMiddleware, isAdmin, getAllUsers);


// router.get('/users/:userId/orders', authMiddleware, isAdmin, getUserOrders); // Add another route for admins


// // GET all orders (Admin only)
// router.get('/orders', authMiddleware, isAdmin, getAllOrders);

// // PUT update order status and other charges (Admin only)
// router.put('/orders/:orderId', authMiddleware, isAdmin, updateOrder);

// // DELETE order (Admin only)
// router.delete('/orders/:orderId', authMiddleware, isAdmin, deleteOrder);

// export default router;



// // adminRoutes.js

// import express from 'express';
// import { getAllUsers, getAllOrders, updateOrder, deleteOrder, getUser ,getUserOrders } from '../controllers/adminController.js';
// import authMiddleware from '../middlewares/authMiddleware.js';
// import { getUserPayments} from '../controllers/paymentController.js';

// const router = express.Router();

// // Middleware to check if the user is an admin
// const isAdmin = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//         return next();
//     }
//     return res.status(403).json({ message: 'Unauthorized: Admin access required' });
// };

// // GET a specific user
// router.get('/users/:userId', authMiddleware, isAdmin, getUser);

// // GET all users (Admin only)
// router.get('/users', authMiddleware, isAdmin, getAllUsers);


// router.get('/users/:userId/orders', authMiddleware, isAdmin, getUserOrders); // Add another route for admins

// router.get('/users/:userId/payments', authMiddleware, isAdmin, getUserPayments); // Add another route for getting payments

// // GET all orders (Admin only)
// router.get('/orders', authMiddleware, isAdmin, getAllOrders);

// // PUT update order status and other charges (Admin only)
// router.put('/orders/:orderId', authMiddleware, isAdmin, updateOrder);

// // DELETE order (Admin only)
// router.delete('/orders/:orderId', authMiddleware, isAdmin, deleteOrder);

// export default router;


// // adminRoutes.js (modified)
// import express from 'express';
// import { getAllUsers, getAllOrders, updateOrder, deleteOrder, getUser, getUserOrders } from '../controllers/adminController.js';
// import authMiddleware from '../middlewares/authMiddleware.js';
// import { getUserPayments } from '../controllers/paymentController.js';
// import { getAdminNotifications } from '../controllers/notificationController.js'; // Import notification controller

// const router = express.Router();

// // Middleware to check if the user is an admin
// const isAdmin = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//         return next();
//     }
//     return res.status(403).json({ message: 'Unauthorized: Admin access required' });
// };

// // GET a specific user
// router.get('/users/:userId', authMiddleware, isAdmin, getUser);

// // GET all users (Admin only)
// router.get('/users', authMiddleware, isAdmin, getAllUsers);

// router.get('/users/:userId/orders', authMiddleware, isAdmin, getUserOrders);

// router.get('/users/:userId/payments', authMiddleware, isAdmin, getUserPayments);

// // GET all orders (Admin only)
// router.get('/orders', authMiddleware, isAdmin, getAllOrders);

// // PUT update order status and other charges (Admin only)
// router.put('/orders/:orderId', authMiddleware, isAdmin, updateOrder);

// // DELETE order (Admin only)
// router.delete('/orders/:orderId', authMiddleware, isAdmin, deleteOrder);

// // GET admin notifications
// router.get('/notifications', authMiddleware, isAdmin, getAdminNotifications); // Added route for notifications

// export default router;





// //adminRoutes.js
// import express from 'express';
// import { getAllUsers, getAllOrders, updateOrder, deleteOrder, getUser, getUserOrders, getSingleOrder } from '../controllers/adminController.js'; // Import getSingleOrder
// import authMiddleware from '../middlewares/authMiddleware.js';
// import { getUserPayments } from '../controllers/paymentController.js';
// import { getAdminNotifications , markNotificationAsRead } from '../controllers/notificationController.js'; // Import notification controller

// const router = express.Router();

// // Middleware to check if the user is an admin
// const isAdmin = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//         return next();
//     }
//     return res.status(403).json({ message: 'Unauthorized: Admin access required' });
// };

// // GET a specific user
// router.get('/users/:userId', authMiddleware, isAdmin, getUser);

// // GET all users (Admin only)
// router.get('/users', authMiddleware, isAdmin, getAllUsers);

// // GET orders for a specific user (Admin only)
// router.get('/users/:userId/orders', authMiddleware, isAdmin, getUserOrders);

// router.get('/users/:userId/payments', authMiddleware, isAdmin, getUserPayments);

// // GET all orders (Admin only)
// router.get('/orders', authMiddleware, isAdmin, getAllOrders);

// // GET a single order (Admin only)
// router.get('/orders/:orderId', authMiddleware, isAdmin, getSingleOrder); // Define route for getSingleOrder

// // PUT update order status and other charges (Admin only)
// router.put('/orders/:orderId', authMiddleware, isAdmin, updateOrder);

// // DELETE order (Admin only)
// router.delete('/orders/:orderId', authMiddleware, isAdmin, deleteOrder);

// // GET admin notifications
// router.get('/notifications', authMiddleware, isAdmin, getAdminNotifications); // Added route for notifications
// // PUT mark notification as read
// router.put('/notifications/:notificationId/mark-as-read', authMiddleware, isAdmin, markNotificationAsRead);

// export default router;


// import express from 'express';
// import { getAllUsers, getAllOrders, updateOrder, deleteOrder, getUser, getUserOrders, getSingleOrder } from '../controllers/adminController.js'; // Import getSingleOrder
// import authMiddleware from '../middlewares/authMiddleware.js';
// import { getUserPayments } from '../controllers/paymentController.js';
// import { getAdminNotifications , markNotificationAsRead } from '../controllers/notificationController.js'; // Import notification controller

// const router = express.Router();

// // Middleware to check if the user is an admin
// const isAdmin = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//         return next();
//     }
//     return res.status(403).json({ message: 'Unauthorized: Admin access required' });
// };

// // GET a specific user
// router.get('/users/:userId', authMiddleware, isAdmin, getUser);

// // GET all users (Admin only)
// router.get('/users', authMiddleware, isAdmin, getAllUsers);

// // GET orders for a specific user (Admin only)
// router.get('/users/:userId/orders', authMiddleware, isAdmin, getUserOrders);

// router.get('/users/:userId/payments', authMiddleware, isAdmin, getUserPayments);

// // GET all orders (Admin only)
// router.get('/orders', authMiddleware, isAdmin, getAllOrders);

// // GET a single order (Admin only)
// router.get('/orders/:orderId', authMiddleware, isAdmin, getSingleOrder); // Define route for getSingleOrder

// // PUT update order status and other charges (Admin only)
// router.put('/orders/:orderId', authMiddleware, isAdmin, updateOrder);

// // DELETE order (Admin only)
// router.delete('/orders/:orderId', authMiddleware, isAdmin, deleteOrder);

// // GET admin notifications
// router.get('/notifications', authMiddleware, isAdmin, getAdminNotifications); // Added route for notifications
// // PUT mark notification as read
// router.put('/notifications/:notificationId/mark-as-read', authMiddleware, isAdmin, markNotificationAsRead);

// export default router;


import express from 'express';
import { getAllUsers, getAllOrders, updateOrder, deleteOrder, getUser, getUserOrders, getSingleOrder } from '../controllers/adminController.js'; // Import getSingleOrder
import authMiddleware from '../middlewares/authMiddleware.js';
import { getUserPayments } from '../controllers/paymentController.js';
import { getAdminNotifications, markNotificationAsRead } from '../controllers/notificationController.js'; // Import notification controller

const router = express.Router();

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Unauthorized: Admin access required' });
};

// GET a specific user
router.get('/users/:userId', authMiddleware, isAdmin, getUser);

// GET all users (Admin only)
router.get('/users', authMiddleware, isAdmin, getAllUsers);

// GET orders for a specific user (Admin only)
router.get('/users/:userId/orders', authMiddleware, isAdmin, getUserOrders);

router.get('/users/:userId/payments', authMiddleware, isAdmin, getUserPayments);

// GET all orders (Admin only)
router.get('/orders', authMiddleware, isAdmin, getAllOrders);

// GET a single order (Admin only)
router.get('/orders/:orderId', authMiddleware, isAdmin, getSingleOrder); // Define route for getSingleOrder

// PUT update order status and other charges (Admin only)
router.put('/orders/:orderId', authMiddleware, isAdmin, updateOrder);

// DELETE order (Admin only)
router.delete('/orders/:orderId', authMiddleware, isAdmin, deleteOrder);

// GET admin notifications
router.get('/notifications', authMiddleware, isAdmin, getAdminNotifications); // Added route for notifications
// PUT mark notification as read
router.put('/notifications/:notificationId/mark-as-read', authMiddleware, isAdmin, markNotificationAsRead);

export default router;