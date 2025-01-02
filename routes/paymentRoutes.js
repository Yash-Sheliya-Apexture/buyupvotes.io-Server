import express from 'express';
import { createPayment, getPayments } from '../controllers/paymentController.js'; // Import getPayments
const router = express.Router();

router.route('/').post(createPayment).get(getPayments); // Add GET route


export default router;