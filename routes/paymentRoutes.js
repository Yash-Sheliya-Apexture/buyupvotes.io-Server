// import express from 'express';
// import { createPayment, getPayments } from '../controllers/paymentController.js';
// import authMiddleware from '../middlewares/authMiddleware.js';

// const router = express.Router();

// // Payment routes
// router.post('/', authMiddleware, createPayment);
// router.get('/', authMiddleware, getPayments);

// export default router;


// import express from 'express';
// import { createPayment, getPayments } from '../controllers/paymentController.js';
// import authMiddleware from '../middlewares/authMiddleware.js';

// const router = express.Router();

// // Payment routes
// router.post('/', authMiddleware, createPayment);
// router.get('/', authMiddleware, getPayments);

// export default router;




// // paymentRoutes.js (Relevant parts)
// import express from 'express';
// import { createCryptomusPayment, handleCryptomusWebhook, getPayments, getCryptomusPaymentHistory, testCryptomusWebhook } from '../controllers/paymentController.js';
// import authMiddleware from '../middlewares/authMiddleware.js';

// const router = express.Router();

// // Payment routes
// router.post('/cryptomus', authMiddleware, createCryptomusPayment);
// router.post('/cryptomus/webhook', handleCryptomusWebhook);
// router.get('/', authMiddleware, getPayments);
// router.get('/history', authMiddleware, getCryptomusPaymentHistory);
// router.post('/cryptomus/test-webhook', authMiddleware, testCryptomusWebhook); // test url

// export default router;



// routes/paymentRoutes.js
import express from 'express';
import { 
  createCryptomusPayment, 
  handleCryptomusWebhook, 
  getPayments, 
  getCryptomusPaymentHistory, 
  testCryptomusWebhook 
} from '../controllers/paymentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Payment routes
router.post('/cryptomus', authMiddleware, createCryptomusPayment);
router.post('/cryptomus/webhook', handleCryptomusWebhook);
router.get('/', authMiddleware, getPayments);
router.get('/history', authMiddleware, getCryptomusPaymentHistory);
router.post('/cryptomus/test-webhook', authMiddleware, testCryptomusWebhook);

export default router;
