// import express from 'express';
// import { createPayment, getPayments } from '../controllers/paymentController.js';
// import authMiddleware from '../middlewares/authMiddleware.js';

// const router = express.Router();

// // Payment routes
// router.post('/', authMiddleware, createPayment);
// router.get('/', authMiddleware, getPayments);

// export default router;


import express from 'express';
import { createPayment, getPayments } from '../controllers/paymentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Payment routes
router.post('/', authMiddleware, createPayment);
router.get('/', authMiddleware, getPayments);

export default router;

import { ExecutableError } from 'google-auth-library';