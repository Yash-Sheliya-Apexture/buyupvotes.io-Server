import Payment from "../models/Payment.js";
import asyncHandler from '../utils/asyncHandler.js';
import errorHandler from '../utils/errorHandler.js';

// @desc   Create a new payment
// @route  POST /api/payment
// @access Public
const createPayment = asyncHandler(async (req, res) => {
    const { email, cardNumber, cardExpiry, cardCvc, cardHolderName, amount, type, tokens, coins } = req.body;

    if (!email || !cardNumber || !cardExpiry || !cardCvc || !cardHolderName || !amount || !type) {
        return errorHandler(res, 400, 'All fields are required')
    }
    const payment = await Payment.create({
        email,
        cardNumber,
        cardExpiry,
        cardCvc,
        cardHolderName,
        amount,
        type,
        tokens,
        coins
    });

    if (payment) {
      res.status(201).json({
            _id: payment._id,
            email: payment.email,
            message: "Payment Created Success",
       });
    } else {
        return errorHandler(res, 400, 'Payment not created')
    }
});

// @desc   Get all payments
// @route  GET /api/payment
// @access Public
const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({});
    if (payments) {
        res.status(200).json(payments)
    }
    else {
       return errorHandler(res, 404, 'Payment not found')
    }
});


export { createPayment, getPayments }; // Export getPayments