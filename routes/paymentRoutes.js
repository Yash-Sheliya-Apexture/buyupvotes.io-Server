// import express from 'express';
// import { createPayment, getPayments } from '../controllers/paymentController.js'; // Import getPayments
// const router = express.Router();

// router.route('/').post(createPayment).get(getPayments); // Add GET route


// export default router;

//  // routes/paymentRoutes.js
//  import express from 'express';
//  import { createPayment, getPayments } from '../controllers/paymentController.js';
//  import authMiddleware from '../middlewares/authMiddleware.js'; //Import auth middleware

//  const router = express.Router();

//  router.route('/').post(authMiddleware, createPayment).get(authMiddleware, getPayments); // Add GET route and protect

//  export default router;


// import express from 'express';
// import { createPayment, getPayments } from '../controllers/paymentController.js';
// import authMiddleware from '../middlewares/authMiddleware.js';

// const router = express.Router();

// // Payment routes
// router.route('/')
//   .post(authMiddleware, createPayment) // Create a new payment
//   .get(authMiddleware, getPayments);  // Get all payments

// export default router;


import express from 'express';
import { createPayment, getPayments } from '../controllers/paymentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Payment routes
router.post('/', authMiddleware, createPayment);
router.get('/', authMiddleware, getPayments);

export default router;