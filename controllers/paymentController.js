// import Payment from "../models/Payment.js";
// import asyncHandler from '../utils/asyncHandler.js';
// import errorHandler from '../utils/errorHandler.js';

// // @desc   Create a new payment
// // @route  POST /api/payment
// // @access Public
// const createPayment = asyncHandler(async (req, res) => {
//     const { email, cardNumber, cardExpiry, cardCvc, cardHolderName, amount, type, tokens, coins } = req.body;

//     if (!email || !cardNumber || !cardExpiry || !cardCvc || !cardHolderName || !amount || !type) {
//         return errorHandler(res, 400, 'All fields are required')
//     }
//     const payment = await Payment.create({
//         email,
//         cardNumber,
//         cardExpiry,
//         cardCvc,
//         cardHolderName,
//         amount,
//         type,
//         tokens,
//         coins
//     });

//     if (payment) {
//       res.status(201).json({
//             _id: payment._id,
//             email: payment.email,
//             message: "Payment Created Success",
//        });
//     } else {
//         return errorHandler(res, 400, 'Payment not created')
//     }
// });

// // @desc   Get all payments
// // @route  GET /api/payment
// // @access Public
// const getPayments = asyncHandler(async (req, res) => {
//   const payments = await Payment.find({});
//     if (payments) {
//         res.status(200).json(payments)
//     }
//     else {
//        return errorHandler(res, 404, 'Payment not found')
//     }
// });


// export { createPayment, getPayments }; // Export getPayments


//  // controllers/paymentController.js
//  import Payment from "../models/Payment.js";
//  import asyncHandler from '../utils/asyncHandler.js';
//  import errorHandler from '../utils/errorHandler.js';
 
//   // @desc   Create a new payment
//   // @route  POST /api/payment
//   // @access Private
//   const createPayment = asyncHandler(async (req, res) => {
//       const { email, cardNumber, cardExpiry, cardCvc, cardHolderName, amount, type, tokens, coins } = req.body;

//       console.log("Request Body:", req.body)

//       if (!email || !cardNumber || !cardExpiry || !cardCvc || !cardHolderName || !amount || !type) {
//            console.error("Validation failed", { email, cardNumber, cardExpiry, cardCvc, cardHolderName, amount, type })
//           return errorHandler(res, 400, 'All fields are required')
//       }
//       try {
//         const userId = req.user.id // Get userId from auth middleware
//         console.log("userId:", userId);
//         const payment = await Payment.create({
//             email,
//             cardNumber,
//             cardExpiry,
//             cardCvc,
//             cardHolderName,
//             amount,
//             type,
//             tokens,
//             userId, // Assign the user ID to the payment
//             coins
//         });
//         console.log("Payment Created:", payment)
//         if (payment) {
//             res.status(201).json({
//               id: payment.id,
//                 email: payment.email,
//               message: "Payment Created Success",
//             });
//           } else {
//               console.error("Payment not created");
//             return errorHandler(res, 400, 'Payment not created')
//         }
//       } catch (error) {
//             console.error("Error creating payment", error)
//         return errorHandler(res, 500, "Error creating payment")
//     }
//   });
  
//   // @desc   Get all payments by user ID
//   // @route  GET /api/payment
//   // @access Private
//   const getPayments = asyncHandler(async (req, res) => {
//       const userId = req.user.id; // Access user ID from auth middleware
//       const payments = await Payment.find({ userId }); // Filter by user ID
      
//       if (payments && payments.length > 0) {
//           let tokensTotal = 0;
//           for (const payment of payments) {
//             tokensTotal += payment.tokens || 0
//           }

//           res.status(200).json({payments, tokens: tokensTotal})
//       }
//       else {
//       return errorHandler(res, 404, 'Payment not found')
//       }
//   });
 
//   export { createPayment, getPayments };


// // controllers/paymentController.js
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

//     const payments = await Payment.find({ userId }); // Filter by user ID

//     if (payments && payments.length > 0) {
//       let tokensTotal = payments.reduce((total, payment) => total + (payment.tokens || 0), 0);

//       res.status(200).json({ payments, tokens: tokensTotal });
//     } else {
//       return errorHandler(res, 404, "Payments not found");
//     }
//   } catch (error) {
//     console.error("Error fetching payments", error);
//     return errorHandler(res, 500, "Error fetching payments");
//   }
// });

// export { createPayment, getPayments };



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
//     if (payments && payments.length > 0) {

//         let tokensTotal = payments.reduce((total, payment) => total + (payment.tokens || 0), 0);

//       res.status(200).json({ payments, tokens: tokensTotal });
//     } else {
//       return errorHandler(res, 404, "Payments not found");
//     }
//   } catch (error) {
//     console.error("Error fetching payments", error);
//     return errorHandler(res, 500, "Error fetching payments");
//   }
// });

// export { createPayment, getPayments };


import Payment from "../models/Payment.js";
import asyncHandler from "../utils/asyncHandler.js";
import errorHandler from "../utils/errorHandler.js";

// @desc   Create a new payment
// @route  POST /api/payment
// @access Private
const createPayment = asyncHandler(async (req, res) => {
  const { email, cardNumber, cardExpiry, cardCvc, cardHolderName, amount, type, tokens, coins } = req.body;

  console.log("Request Body:", req.body);

  // Validation
  if (!email || !cardNumber || !cardExpiry || !cardCvc || !cardHolderName || !amount || !type) {
    console.error("Validation failed", { email, cardNumber, cardExpiry, cardCvc, cardHolderName, amount, type });
    return errorHandler(res, 400, "All fields are required");
  }

  try {
    const userId = req.user?.id; // Get userId from auth middleware
    if (!userId) {
      console.error("User ID not found in request");
      return errorHandler(res, 401, "Unauthorized");
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
      coins,
      userId, // Assign the user ID to the payment
    });

    console.log("Payment Created:", payment);
    if (payment) {
      res.status(201).json({
        id: payment.id,
        email: payment.email,
        message: "Payment created successfully",
      });
    } else {
      console.error("Payment not created");
      return errorHandler(res, 400, "Payment not created");
    }
  } catch (error) {
    console.error("Error creating payment", error);
    return errorHandler(res, 500, "Error creating payment");
  }
});

// @desc   Get all payments by user ID
// @route  GET /api/payment
// @access Private
const getPayments = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?.id; // Access user ID from auth middleware
    if (!userId) {
      console.error("User ID not found in request");
      return errorHandler(res, 401, "Unauthorized");
    }

    const payments = await Payment.find({ userId }).sort({ createdAt: -1 }); // Filter by user ID, sort by time
    let tokensTotal = 0;
     if(payments && payments.length > 0)
    {
      tokensTotal = payments.reduce((total, payment) => total + (payment.tokens || 0), 0);
    }

      res.status(200).json({ payments, tokens: tokensTotal });

  } catch (error) {
    console.error("Error fetching payments", error);
    return errorHandler(res, 500, "Error fetching payments");
  }
});

export { createPayment, getPayments };