// import Payment from "../models/Payment.js";
// import asyncHandler from "../utils/asyncHandler.js";
// import errorHandler from "../utils/errorHandler.js";

// // @desc   Create a new payment
// // @route  POST /api/payment
// // @access Private
// const createPayment = asyncHandler(async (req, res) => {
//   const { email, cardNumber, cardExpiry, cardCvc, cardHolderName, amount, type, tokens, coins } = req.body;

//   console.log("Request Body:", req.body);

//   // Validation
//   if (!email || !cardNumber || !cardExpiry || !cardCvc || !cardHolderName || !amount || !type) {
//     console.error("Validation failed", { email, cardNumber, cardExpiry, cardCvc, cardHolderName, amount, type });
//     return errorHandler(res, 400, "All fields are required");
//   }

//   try {
//     const userId = req.user?.id; // Get userId from auth middleware
//     if (!userId) {
//       console.error("User ID not found in request");
//       return errorHandler(res, 401, "Unauthorized");
//     }

//     const payment = await Payment.create({
//       email,
//       cardNumber,
//       cardExpiry,
//       cardCvc,
//       cardHolderName,
//       amount,
//       type,
//       tokens,
//       coins,
//       userId, // Assign the user ID to the payment
//     });

//     console.log("Payment Created:", payment);
//     if (payment) {
//       res.status(201).json({
//         id: payment.id,
//         email: payment.email,
//         message: "Payment created successfully",
//       });
//     } else {
//       console.error("Payment not created");
//       return errorHandler(res, 400, "Payment not created");
//     }
//   } catch (error) {
//     console.error("Error creating payment", error);
//     return errorHandler(res, 500, "Error creating payment");
//   }
// });

// // @desc   Get all payments by user ID
// // @route  GET /api/payment
// // @access Private
// const getPayments = asyncHandler(async (req, res) => {
//   try {
//     const userId = req.user?.id; // Access user ID from auth middleware
//     if (!userId) {
//       console.error("User ID not found in request");
//       return errorHandler(res, 401, "Unauthorized");
//     }

//     const payments = await Payment.find({ userId }).sort({ createdAt: -1 }); // Filter by user ID, sort by time
//     let tokensTotal = 0;
//      if(payments && payments.length > 0)
//     {
//       tokensTotal = payments.reduce((total, payment) => total + (payment.tokens || 0), 0);
//     }

//       res.status(200).json({ payments, tokens: tokensTotal });

//   } catch (error) {
//     console.error("Error fetching payments", error);
//     return errorHandler(res, 500, "Error fetching payments");
//   }
// });

// export { createPayment, getPayments };



// import Payment from "../models/Payment.js";
// import asyncHandler from "../utils/asyncHandler.js";

// // @desc   Create a new payment
// // @route  POST /api/payment
// // @access Private
// const createPayment = asyncHandler(async (req, res) => {
//   const { email, cardNumber, cardExpiry, cardCvc, cardHolderName, amount, type, tokens, coins } = req.body;

//   console.log("Request Body:", req.body);

//   // Validation
//   if (!email || !cardNumber || !cardExpiry || !cardCvc || !cardHolderName || !amount || !type) {
//     console.error("Validation failed", { email, cardNumber, cardExpiry, cardCvc, cardHolderName, amount, type });
//     return res.status(400).json( {message: "All fields are required"} );
//   }

//   try {
//     const userId = req.user?._id; // Get userId from auth middleware
//     if (!userId) {
//       console.error("User ID not found in request");
//       return res.status(401).json({message: "Unauthorized"});
//     }

//     const payment = await Payment.create({
//       email,
//       cardNumber,
//       cardExpiry,
//       cardCvc,
//       cardHolderName,
//       amount,
//       type,
//       tokens,
//       coins,
//       userId, // Assign the user ID to the payment
//     });

//     console.log("Payment Created:", payment);
//     if (payment) {
//       res.status(201).json({
//         id: payment.id,
//         email: payment.email,
//         message: "Payment created successfully",
//       });
//     } else {
//       console.error("Payment not created");
//         return res.status(400).json({ message:"Payment not created" });
//     }
//   } catch (error) {
//     console.error("Error creating payment", error);
//      return res.status(500).json({message: "Error creating payment"});
//   }
// });

// // @desc   Get all payments by user ID
// // @route  GET /api/payment
// // @access Private
// const getPayments = asyncHandler(async (req, res) => {
//   try {
//     const userId = req.user?._id; // Access user ID from auth middleware
//     if (!userId) {
//       console.error("User ID not found in request");
//       return res.status(401).json({message: "Unauthorized"});
//     }

//     const payments = await Payment.find({ userId }).sort({ createdAt: -1 }); // Filter by user ID, sort by time
//     let tokensTotal = 0;
//      if(payments && payments.length > 0)
//     {
//       tokensTotal = payments.reduce((total, payment) => total + (payment.tokens || 0), 0);
//     }

//       res.status(200).json({ payments, tokens: tokensTotal });

//   } catch (error) {
//     console.error("Error fetching payments", error);
//    return res.status(500).json({message: "Error fetching payments"});
//   }
// });

// export { createPayment, getPayments };



// import Payment from "../models/Payment.js";
// import asyncHandler from "../utils/asyncHandler.js";

// // @desc   Create a new payment
// // @route  POST /api/payment
// // @access Private
// const createPayment = asyncHandler(async (req, res) => {
//   const { email, cardNumber, cardExpiry, cardCvc, cardHolderName, amount, type } = req.body;

//   console.log("Request Body:", req.body);

//   // Validation
//   if (!email || !cardNumber || !cardExpiry || !cardCvc || !cardHolderName || !amount || !type) {
//     console.error("Validation failed", { email, cardNumber, cardExpiry, cardCvc, cardHolderName, amount, type });
//     return res.status(400).json( {message: "All fields are required"} );
//   }

//   try {
//     const userId = req.user?._id; // Get userId from auth middleware
//     if (!userId) {
//       console.error("User ID not found in request");
//       return res.status(401).json({message: "Unauthorized"});
//     }

//     const payment = await Payment.create({
//       email,
//       cardNumber,
//       cardExpiry,
//       cardCvc,
//       cardHolderName,
//       amount,
//       type,
//       userId, // Assign the user ID to the payment
//     });

//     console.log("Payment Created:", payment);
//     if (payment) {
//       res.status(201).json({
//         id: payment.id,
//         email: payment.email,
//         message: "Payment created successfully",
//       });
//     } else {
//       console.error("Payment not created");
//         return res.status(400).json({ message:"Payment not created" });
//     }
//   } catch (error) {
//     console.error("Error creating payment", error);
//      return res.status(500).json({message: "Error creating payment"});
//   }
// });

// // @desc   Get all payments by user ID
// // @route  GET /api/payment
// // @access Private
// const getPayments = asyncHandler(async (req, res) => {
//   try {
//     const userId = req.user?._id; // Access user ID from auth middleware
//     if (!userId) {
//       console.error("User ID not found in request");
//       return res.status(401).json({message: "Unauthorized"});
//     }

//     const payments = await Payment.find({ userId }).sort({ createdAt: -1 }); // Filter by user ID, sort by time
//   res.status(200).json({ payments });

//   } catch (error) {
//     console.error("Error fetching payments", error);
//    return res.status(500).json({message: "Error fetching payments"});
//   }
// });

// export { createPayment, getPayments };



// // controllers/paymentController.js
// import Payment from "../models/Payment.js";
// import asyncHandler from "../utils/asyncHandler.js";
// import User from '../models/User.js';  // Import User model

// // @desc   Create a new payment
// // @route  POST /api/payment
// // @access Private
// const createPayment = asyncHandler(async (req, res) => {
//   const { email, cardNumber, cardExpiry, cardCvc, cardHolderName, amount, type } = req.body;

//   console.log("Request Body:", req.body);

//   // Validation
//   if (!email || !cardNumber || !cardExpiry || !cardCvc || !cardHolderName || !amount || !type) {
//     console.error("Validation failed", { email, cardNumber, cardExpiry, cardCvc, cardHolderName, amount, type });
//     return res.status(400).json( {message: "All fields are required"} );
//   }

//   try {
//     const userId = req.user?._id; // Get userId from auth middleware
//     if (!userId) {
//       console.error("User ID not found in request");
//       return res.status(401).json({message: "Unauthorized"});
//     }

//     const payment = await Payment.create({
//       email,
//       cardNumber,
//       cardExpiry,
//       cardCvc,
//       cardHolderName,
//       amount,
//       type,
//       userId, // Assign the user ID to the payment
//     });

//     console.log("Payment Created:", payment);
//     if (payment) {

//       // Update user's total amount:
//       await User.findByIdAndUpdate(userId, { $inc: { totalAmount: amount } });
//         // Note : - $inc : Increments the value of the field by the specified amount.
//       res.status(201).json({
//         id: payment.id,
//         email: payment.email,
//         message: "Payment created successfully",
//       });
//     } else {
//       console.error("Payment not created");
//         return res.status(400).json({ message:"Payment not created" });
//     }
//   } catch (error) {
//     console.error("Error creating payment", error);
//      return res.status(500).json({message: "Error creating payment"});
//   }
// });

// // @desc   Get all payments by user ID
// // @route  GET /api/payment
// // @access Private
// const getPayments = asyncHandler(async (req, res) => {
//   try {
//     const userId = req.user?._id; // Access user ID from auth middleware
//     if (!userId) {
//       console.error("User ID not found in request");
//       return res.status(401).json({message: "Unauthorized"});
//     }

//     const payments = await Payment.find({ userId }).sort({ createdAt: -1 }); // Filter by user ID, sort by time
//   res.status(200).json({ payments });

//   } catch (error) {
//     console.error("Error fetching payments", error);
//    return res.status(500).json({message: "Error fetching payments"});
//   }
// });

// export { createPayment, getPayments };




// paymentController.js

import Payment from "../models/Payment.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from '../models/User.js';  // Import User model

// @desc   Create a new payment
// @route  POST /api/payment
// @access Private
const createPayment = asyncHandler(async (req, res) => {
  const { email, cardNumber, cardExpiry, cardCvc, cardHolderName, amount, type } = req.body;

  console.log("Request Body:", req.body);

  // Validation
  if (!email || !cardNumber || !cardExpiry || !cardCvc || !cardHolderName || !amount || !type) {
    console.error("Validation failed", { email, cardNumber, cardExpiry, cardCvc, cardHolderName, amount, type });
    return res.status(400).json( {message: "All fields are required"} );
  }

  try {
    const userId = req.user?._id; // Get userId from auth middleware
    if (!userId) {
      console.error("User ID not found in request");
      return res.status(401).json({message: "Unauthorized"});
    }

    const payment = await Payment.create({
      email,
      cardNumber,
      cardExpiry,
      cardCvc,
      cardHolderName,
      amount,
      type,
      userId, // Assign the user ID to the payment
    });

    console.log("Payment Created:", payment);
    if (payment) {

      // Update user's total amount:
      await User.findByIdAndUpdate(userId, { $inc: { totalAmount: amount } });
        // Note : - $inc : Increments the value of the field by the specified amount.
      res.status(201).json({
        id: payment.id,
        email: payment.email,
        message: "Payment created successfully",
      });
    } else {
      console.error("Payment not created");
        return res.status(400).json({ message:"Payment not created" });
    }
  } catch (error) {
    console.error("Error creating payment", error);
     return res.status(500).json({message: "Error creating payment"});
  }
});

// @desc   Get all payments by user ID
// @route  GET /api/payment
// @access Private
const getPayments = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?._id; // Access user ID from auth middleware
    if (!userId) {
      console.error("User ID not found in request");
      return res.status(401).json({message: "Unauthorized"});
    }

    const payments = await Payment.find({ userId }).sort({ createdAt: -1 }); // Filter by user ID, sort by time
  res.status(200).json({ payments });

  } catch (error) {
    console.error("Error fetching payments", error);
   return res.status(500).json({message: "Error fetching payments"});
  }
});
// @desc   Get all payments by user ID (ADMIN)
// @route  GET /api/admin/users/:userId/payments
// @access Private
const getUserPayments = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params; // Access user ID from path parameters
    if (!userId) {
      console.error("User ID not found in request");
      return res.status(400).json({message: "User ID is required"});
    }

    const payments = await Payment.find({ userId }).sort({ createdAt: -1 }); // Filter by user ID, sort by time
    res.status(200).json({ payments });

  } catch (error) {
    console.error("Error fetching payments", error);
    return res.status(500).json({message: "Error fetching payments"});
  }
});

export { createPayment, getPayments, getUserPayments };