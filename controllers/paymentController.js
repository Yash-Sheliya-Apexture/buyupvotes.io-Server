// paymentController.js
import Payment from "../models/Payment.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from '../models/User.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

const CRYPTOMUS_MERCHANT_UUID = process.env.CRYPTOMUS_MERCHANT_UUID;
const CRYPTOMUS_PAYMENT_KEY = process.env.CRYPTOMUS_PAYMENT_KEY;
const CRYPTOMUS_URL = process.env.CRYPTOMUS_URL;

// Function to map Cryptomus payment statuses to your internal statuses
const mapCryptomusStatus = (cryptomusStatus) => {
    console.log("Mapping Cryptomus Status:", cryptomusStatus);
    switch (cryptomusStatus) {
        case "paid":
        case "paid_over": // over paid
            return "paid";
        case "process":
        case "confirm_check":
            return "processing";
        case "wrong_amount_waiting":
        case "check":
            return "waiting";
        case "cancel":
        case "system_fail":
        case "fail":
            return "failed";
        case "refund_process":
            return "refunding";
        case "refund_fail":
            return "refund_failed";
        case "refund_other":
            return "refund_success";
        case "locked":
            return "blocked";
        default:
            console.warn("Unknown Cryptomus status:", cryptomusStatus);
            return "unknown";
    }
};

// @desc   Get payment history from Cryptomus
// @route  GET /api/payment/history
// @access Private
const getCryptomusPaymentHistory = asyncHandler(async (req, res) => {
    try {
        const userId = req.user?._id;

        console.log("User ID:", userId);

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Fetch local payments from your database based on userId
        const localPayments = await Payment.find({ userId });
        console.log("Local Payments:", localPayments);

        // Construct the request payload (Check Cryptomus API documentation)
        const payload = {
            merchant_uuid: String(CRYPTOMUS_MERCHANT_UUID), // Use merchant_uuid as specified by Cryptomus API.
        };

        console.log("Cryptomus API Payload:", payload);

        // Create signature
        const payloadString = JSON.stringify(payload);
        console.log("Payload String:", payloadString);

        //**IMPORTANT: Use UTF-8 encoding and ensure the payload is correctly stringified**
        const base64data = Buffer.from(payloadString, 'utf8').toString("base64");  //**ADDED UTF8 encoding**
        console.log("Base64 Encoded Payload:", base64data);
        console.log("CRYPTOMUS_PAYMENT_KEY:", process.env.CRYPTOMUS_PAYMENT_KEY); // ADD THIS LINE

       // **Correct Concatenation Order**
        const signatureString = base64data + process.env.CRYPTOMUS_PAYMENT_KEY // **Order of concatenation is important**
        console.log("String for Hashing:", signatureString);

        const sign = crypto
            .createHash("md5")
        .update(base64data + CRYPTOMUS_PAYMENT_KEY)
        .digest("hex");

        console.log("Cryptomus API Signature:", sign);

        // Make the request to the Cryptomus API
        try {
            const response = await axios.post(`${CRYPTOMUS_URL}payment/list`, payload, {
                headers: {
                    Merchant: CRYPTOMUS_MERCHANT_UUID,
                    Sign: sign,
                    "Content-Type": "application/json",
                },
            });

            console.log("Cryptomus API Response Data:", response.data);

            let cryptomusPayments = [];
            if (response.data && response.data.result && response.data.result.items) {
                // Map Cryptomus payment data to a suitable format
                cryptomusPayments = response.data.result.items.map(item => {
                    console.log("Cryptomus Status from API:", item.status); // **DEBUGGING: Log the raw status from Cryptomus**
                    return {
                        id: item.uuid, // Use UUID from Cryptomus
                        type: 'cryptomus', // Set type
                        amount: item.amount, // Amount
                        createdAt: item.created_at,
                        status: item.status, // Use Cryptomus original status
                        orderId: item.order_id // Use Cryptomus order_id
                        // Add other relevant fields
                    };
                });
            } else {
                console.error("Error fetching payment history from Cryptomus:", response.data);
                // Don't return an error here; we can still use local data
            }

            // Combine and reconcile local and Cryptomus payments
            const combinedPayments = localPayments.map(localPayment => {
                const cryptomusPayment = cryptomusPayments.find(cp => cp.orderId === localPayment.orderId);

                if (cryptomusPayment) {
                    //Debug to see each object
                     console.log("localPayment", localPayment);
                    console.log("cryptomusPayment", cryptomusPayment);

                    console.log("Before Mapping: Cryptomus Status:", cryptomusPayment.status);
                    const mappedStatus = mapCryptomusStatus(cryptomusPayment.status);

                      console.log("After Mapping:  mappedStatus", mappedStatus);

                    return {
                        ...localPayment.toObject(), // Convert Mongoose document to plain object
                        id: cryptomusPayment.id,
                        status: mappedStatus, // Use mapped status here
                        type: 'cryptomus', // Ensure type is set
                        amount: cryptomusPayment.amount,
                        createdAt: cryptomusPayment.createdAt
                    };
                } else {
                    // If no Cryptomus payment, use local data
                    return localPayment.toObject();  // Return the local payment object
                }
            });

            console.log("combinedPayments result:", combinedPayments);
            res.status(200).json(combinedPayments);

        } catch (apiError) {
            console.error("Cryptomus API Error:", apiError.response ? apiError.response.data : apiError.message);
            return res.status(500).json({ message: "Error communicating with Cryptomus API", error: apiError.response ? apiError.response.data : apiError.message });
        }
    } catch (error) {
        console.error("Cryptomus API Error:", error);
        res.status(500).json({ message: "Error communicating with Cryptomus API" });
    }
});

// @desc   Create a new Cryptomus payment and redirect
// @route  POST /api/payment/cryptomus
// @access Private
const createCryptomusPayment = asyncHandler(async (req, res) => {
   const { amount, returnUrl, successUrl } = req.body;

    if (!amount) {
        return res.status(400).json({ message: "Amount is required" });
    }

    if (amount < 1) {
        return res.status(400).json({ message: "Minimum amount is $1" });
    }

    const userId = req.user?._id;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const orderId = uuidv4(); // Generate a unique order ID

    const payload = {
        amount: String(amount),
        currency: 'USD',
        order_id: orderId,
        url_return: returnUrl,
        url_success: successUrl //ADDED RETURN AND SUCCESS URL
    };
    console.log("payload :", payload);
    //Create signature
    let base64data = Buffer.from(JSON.stringify(payload)).toString("base64");
    console.log("base64data: ", base64data);
    const sign = crypto
        .createHash("md5")
        .update(base64data + CRYPTOMUS_PAYMENT_KEY)
        .digest("hex");
        console.log("signature : ", sign);
         const url = `${CRYPTOMUS_URL}payment`;
    try {
       const response = await axios.post(
            url,
            payload,
            {
                headers: {
                    Merchant: CRYPTOMUS_MERCHANT_UUID,
                    Sign: sign,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("response", response.data);
        if (response.data.result.url) {
            // Save minimal payment info to your database
            await Payment.create({
                userId: userId,
                amount: amount,
                type: 'cryptomus',
                orderId: orderId, // Store the Cryptomus order ID
                status: 'pending', // Initial status
            });
            res.status(200).json({ url: response.data.result.url }); // Redirect URL
        } else {
            console.error("Cryptomus Payment Creation Error:", response.data);
            res.status(500).json({ message: "Failed to create Cryptomus payment" });
        }
    } catch (error) {
        console.error("Cryptomus API Error:", error.response ? error.response.data : error.message);
          res.status(500).json({ message: "Error communicating with Cryptomus API" });
    }
});


// @desc   Handle Cryptomus Webhook
// @route  POST /api/payment/cryptomus/webhook
// @access Public (Cryptomus will call this)
const handleCryptomusWebhook = asyncHandler(async (req, res) => {
    try {
        const signature = req.headers.signature;
        const receivedData = req.body;

        // Log everything you receive
        console.log("Webhook Received Data:", receivedData);
        console.log("Webhook Received Headers:", req.headers);

        // Ensure that the received data is properly stringified
        const base64data = Buffer.from(JSON.stringify(receivedData)).toString("base64");
        const calculatedSignature = crypto
            .createHash("md5")
            .update(base64data + CRYPTOMUS_PAYMENT_KEY)
            .digest("hex");

        // Log signatures for comparison
        console.log("Received Signature:", signature);
        console.log("Calculated Signature:", calculatedSignature);

        if (signature !== calculatedSignature) {
            console.error("Invalid signature");
            return res.status(400).send('Invalid signature');
        }

        const { status, order_id, amount } = receivedData;

        console.log("Webhook Status:", status);
        console.log("Webhook Order ID:", order_id);
        console.log("Webhook amount:", amount);

        const payment = await Payment.findOne({ orderId: order_id });

        if (!payment) {
            console.error("Payment not found for order ID:", order_id);
            return res.status(404).send('Payment not found');
        }

        console.log("Payment Found:", payment); // Log the payment object

        payment.status = mapCryptomusStatus(status); //Update payment status based on webhook data
        payment.amount = amount;
        await payment.save();

        console.log("Payment Updated:", payment); // Log the payment object after saving


        if (status === 'paid') {
            // Update user's total amount
            await User.findByIdAndUpdate(payment.userId, { $inc: { totalAmount: parseFloat(amount) } });
        }

        res.status(200).send('Webhook received successfully');
    } catch (error) {
        console.error("Error handling webhook:", error.response ? error.response.data : error.message);
        res.status(500).json({ message: "Error handling webhook", error: error.message });
    }
});

// @desc   Get all payments by user ID
// @route  GET /api/payment
// @access Private
const getPayments = asyncHandler(async (req, res) => {
    try {
        const userId = req.user?._id;

        console.log("getPayments - User ID:", userId);

        if (!userId) {
            console.error("getPayments - User ID not found in request");
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Fetch data using the logic from getCryptomusPaymentHistory, and passing the same context
        const payments = await getCryptomusPaymentHistory(req, res);

        if (res.headersSent) {
            // Ensure that the response is not sent again (getCryptomusPaymentHistory might have sent it already)
            console.log("getPayments - Headers already sent, returning");
            return;
        }

        console.log("getPayments - payments:", payments);

        // Return the payments array, not wrapped in another object as it's already an array
        res.status(200).json(payments);
    } catch (error) {
        console.error("getPayments - Error fetching payments:", error);
        res.status(500).json({ message: "Error fetching payments" });
    }

});


// @desc   Test Cryptomus Webhook - for simulating webhook calls during development
// @route  POST /api/payment/cryptomus/test-webhook
// @access Private
const testCryptomusWebhook = asyncHandler(async (req, res) => {
    try {
        // Extract parameters from the request body
        const { url_callback, currency, network, uuid, order_id, status, amount } = req.body;

        // Validate required parameters
        if (!url_callback || !currency || !network || (!uuid && !order_id) || !status) {
            return res.status(400).json({ message: "url_callback, currency, network, (uuid or order_id), and status are required." });
        }

         // Ensure that amount is present, valid and a number
         if (!amount || isNaN(parseFloat(amount))) {
             return res.status(400).json({ message: "Amount is required and must be a valid number." });
         }

        // Validate currency is USD
        if (currency !== 'USD') {
            return res.status(400).json({ message: "Currency must be USD for this test." });
        }

        // Construct the simulated webhook payload
        const webhookData = {
            status: status,
            currency: currency, // Include currency in webhookData
            network: network, // Include network in webhookData,
            amount: amount,
            order_id: order_id
        };
        if(uuid) {
            webhookData.uuid = uuid; // If uuid is present add it to the webhook
        }

        // Calculate the signature for the webhook
        const base64data = Buffer.from(JSON.stringify(webhookData)).toString("base64");
        const signature = crypto
            .createHash("md5")
            .update(base64data + CRYPTOMUS_PAYMENT_KEY)
            .digest("hex");


        // Simulate the headers
        const simulatedHeaders = {
            'signature': signature
        };

        // Manually call the handleCryptomusWebhook function with the simulated data

        // Create a mock request object
        const mockReq = {
            headers: simulatedHeaders,
            body: webhookData
        };

        // Create a mock response object
        const mockRes = {
            status: (code) => {
                mockRes.statusCode = code;
                return mockRes;
                },
                send: (message) => {
                    mockRes.message = message;
                    return mockRes;
                },
                json: (data) => {
                    mockRes.data = data;
                    return mockRes;
                }
        };

        // Call the handleCryptomusWebhook function
        try {
            await handleCryptomusWebhook(mockReq, mockRes);

            // Check if handleCryptomusWebhook returned an error
            if (mockRes.statusCode >= 400) {
                console.error("handleCryptomusWebhook returned an error:", mockRes.statusCode, mockRes.message, mockRes.data); // Log the full error details
                return res.status(500).json({ message: "Error processing test webhook: handleCryptomusWebhook failed", details: { statusCode: mockRes.statusCode, message: mockRes.message, data: mockRes.data } });  // Include details in the response for debugging

            }

            // Construct a response
            res.status(200).json({ message: 'Test webhook processed successfully',  handleCryptomusWebhookResponse: { statusCode: mockRes.statusCode, message: mockRes.message, data: mockRes.data }});

        } catch (error) {
             console.error("Error calling handleCryptomusWebhook:", error.message);
             return res.status(500).json({ message: "Error during handleCryptomusWebhook execution", error: error.message });
        }

    } catch (error) {
        console.error("Error processing test webhook:", error.response ? error.response.data : error.message);
        res.status(500).json({ message: "Error processing test webhook", error: error.message });
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
            return res.status(400).json({ message: "User ID is required" });
        }

        const payments = await Payment.find({ userId: userId }).sort({ createdAt: -1 }); // Filter by user ID, sort by time
        res.status(200).json(payments);

    } catch (error) {
        console.error("Error fetching payments", error);
        return res.status(500).json({ message: "Error fetching payments" });
    }
});

export { createCryptomusPayment, handleCryptomusWebhook, getPayments, getCryptomusPaymentHistory, testCryptomusWebhook, getUserPayments };



// // controllers/paymentController.js
// import Payment from "../models/Payment.js";
// import asyncHandler from "../utils/asyncHandler.js";
// import User from '../models/User.js';
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';
// import crypto from 'crypto';
// import generateCryptomusSignature from '../utils/generateCryptomusSignature.js';

// const CRYPTOMUS_MERCHANT_UUID = process.env.CRYPTOMUS_MERCHANT_UUID;
// const CRYPTOMUS_PAYMENT_KEY = process.env.CRYPTOMUS_PAYMENT_KEY;
// const CRYPTOMUS_URL = process.env.CRYPTOMUS_URL;

// // Function to map Cryptomus payment statuses to your internal statuses
// const mapCryptomusStatus = (cryptomusStatus) => {
//     console.log("Mapping Cryptomus Status:", cryptomusStatus);
//     switch (cryptomusStatus) {
//         case "paid":
//         case "paid_over":
//             return "paid";
//         case "process":
//         case "confirm_check":
//             return "processing";
//         case "wrong_amount_waiting":
//         case "check":
//             return "waiting";
//         case "cancel":
//         case "system_fail":
//         case "fail":
//             return "failed";
//         case "refund_process":
//             return "refunding";
//         case "refund_fail":
//             return "refund_failed";
//         case "refund_other":
//             return "refund_success";
//         case "locked":
//             return "blocked";
//         default:
//             console.warn("Unknown Cryptomus status:", cryptomusStatus);
//             return "unknown";
//     }
// };

// // @desc   Get payment history from Cryptomus
// // @route  GET /api/payment/history
// // @access Private
// const getCryptomusPaymentHistory = asyncHandler(async (req, res) => {
//     try {
//         const userId = req.user?._id;
//         console.log("User ID:", userId);
//         if (!userId) {
//             return res.status(401).json({ message: "Unauthorized" });
//         }

//         // Fetch local payments from your database based on userId
//         const localPayments = await Payment.find({ userId });
//         console.log("Local Payments:", localPayments);

//         // Construct the request payload
//         const payload = {
//             merchant_uuid: String(CRYPTOMUS_MERCHANT_UUID)
//         };
//         console.log("Cryptomus API Payload:", payload);

//         // Generate signature manually (or you could use generateCryptomusSignature)
//         const jsonData = JSON.stringify(payload); // simple payload so sorting is not critical
//         const base64data = Buffer.from(jsonData, 'utf8').toString("base64");
//         const sign = crypto
//             .createHash("md5")
//             .update(base64data + CRYPTOMUS_PAYMENT_KEY)
//             .digest("hex");

//         console.log("Base64 Encoded Payload:", base64data);
//         console.log("Generated Cryptomus Signature:", sign);

//         // Request payment history from Cryptomus
//         const response = await axios.post(`${CRYPTOMUS_URL}payment/list`, payload, {
//             headers: {
//                 Merchant: CRYPTOMUS_MERCHANT_UUID,
//                 Sign: sign,
//                 "Content-Type": "application/json",
//             },
//         });
//         console.log("Cryptomus API Response Data:", response.data);

//         let cryptomusPayments = [];
//         if (response.data && response.data.result && response.data.result.items) {
//             cryptomusPayments = response.data.result.items.map(item => {
//                 console.log("Cryptomus Status from API:", item.status);
//                 return {
//                     id: item.uuid,
//                     type: 'cryptomus',
//                     amount: item.amount,
//                     createdAt: item.created_at,
//                     status: item.status,
//                     orderId: item.order_id
//                 };
//             });
//         } else {
//             console.error("Error fetching payment history from Cryptomus:", response.data);
//         }

//         // Combine local and Cryptomus payments
//         const combinedPayments = localPayments.map(localPayment => {
//             const cryptomusPayment = cryptomusPayments.find(cp => cp.orderId === localPayment.orderId);
//             if (cryptomusPayment) {
//                 console.log("localPayment:", localPayment);
//                 console.log("cryptomusPayment:", cryptomusPayment);
//                 const mappedStatus = mapCryptomusStatus(cryptomusPayment.status);
//                 return {
//                     ...localPayment.toObject(),
//                     id: cryptomusPayment.id,
//                     status: mappedStatus,
//                     type: 'cryptomus',
//                     amount: cryptomusPayment.amount,
//                     createdAt: cryptomusPayment.createdAt
//                 };
//             } else {
//                 return localPayment.toObject();
//             }
//         });

//         console.log("combinedPayments result:", combinedPayments);
//         res.status(200).json(combinedPayments);
//     } catch (error) {
//         console.error("Cryptomus API Error:", error);
//         res.status(500).json({ message: "Error communicating with Cryptomus API" });
//     }
// });

// // @desc   Create a new Cryptomus payment
// // @route  POST /api/payment/cryptomus
// // @access Private
// const createCryptomusPayment = asyncHandler(async (req, res) => {
//     const { amount, returnUrl, successUrl } = req.body;
//     if (!amount || amount < 1) {
//         return res.status(400).json({ message: "Minimum amount is $1" });
//     }

//     const userId = req.user?._id;
//     if (!userId) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     const orderId = uuidv4(); // Generate unique order ID
//     // Ensure the amount is formatted as a string with two decimals
//     const formattedAmount = String(parseFloat(amount).toFixed(2));

//     const payload = {
//         amount: formattedAmount,
//         currency: 'USD',
//         order_id: orderId,
//         url_return: returnUrl,
//         url_success: successUrl,
//     };

//     try {
//         // Ensure payload is sorted alphabetically by keys
//         const sortedPayload = Object.keys(payload).sort().reduce(
//             (obj, key) => {
//                 obj[key] = payload[key];
//                 return obj;
//             },
//             {}
//         );
//         console.log("Sorted Cryptomus Payload:", sortedPayload);

//         // Convert sorted payload to JSON string
//         const jsonData = JSON.stringify(sortedPayload);

//         // Convert JSON string to Base64 encoding
//         const base64data = Buffer.from(jsonData, 'utf8').toString('base64');
//         console.log("Base64 Encoded Payload:", base64data);

//         // Generate signature
//         const sign = crypto
//             .createHash('md5')
//             .update(base64data + CRYPTOMUS_PAYMENT_KEY)
//             .digest('hex');
//         console.log("Generated Signature:", sign);

//         // Send request to Cryptomus API
//         const response = await axios.post(`${CRYPTOMUS_URL}payment`, payload, {
//             headers: {
//                 Merchant: CRYPTOMUS_MERCHANT_UUID,
//                 Sign: sign,
//                 "Content-Type": "application/json",
//             },
//         });
//         console.log("Cryptomus API Response:", response.data);

//         if (response.data.result && response.data.result.url) {
//             // Save payment info to your database
//             await Payment.create({
//                 userId,
//                 amount,
//                 type: 'cryptomus',
//                 orderId,
//                 status: 'pending',
//             });
//             return res.status(200).json({ url: response.data.result.url });
//         } else {
//             console.error("Cryptomus Payment Error:", response.data);
//             return res.status(500).json({ message: "Failed to create Cryptomus payment" });
//         }
//     } catch (error) {
//         console.error("Cryptomus API Error:", error.response ? error.response.data : error.message);
//         return res.status(500).json({ message: "Error communicating with Cryptomus API" });
//     }
// });


// // @desc   Handle Cryptomus Webhook
// // @route  POST /api/payment/cryptomus/webhook
// // @access Public (Cryptomus will call this)
// const handleCryptomusWebhook = asyncHandler(async (req, res) => {
//     try {
//         const signature = req.headers.signature;
//         const receivedData = req.body;

//         console.log("Webhook Received Data:", receivedData);
//         console.log("Webhook Received Headers:", req.headers);

//         // Calculate signature for received data (sort keys to match the expected format)
//         const base64data = Buffer.from(JSON.stringify(receivedData), 'utf8').toString("base64");
//         const calculatedSignature = crypto
//             .createHash("md5")
//             .update(base64data + CRYPTOMUS_PAYMENT_KEY)
//             .digest("hex");

//         console.log("Received Signature:", signature);
//         console.log("Calculated Signature:", calculatedSignature);

//         if (signature !== calculatedSignature) {
//             console.error("Invalid signature");
//             return res.status(400).send('Invalid signature');
//         }

//         const { status, order_id, amount } = receivedData;
//         console.log("Webhook Status:", status);
//         console.log("Webhook Order ID:", order_id);
//         console.log("Webhook Amount:", amount);

//         const payment = await Payment.findOne({ orderId: order_id });
//         if (!payment) {
//             console.error("Payment not found for order ID:", order_id);
//             return res.status(404).send('Payment not found');
//         }

//         console.log("Payment Found:", payment);
//         payment.status = mapCryptomusStatus(status);
//         payment.amount = amount;
//         await payment.save();
//         console.log("Payment Updated:", payment);

//         if (status === 'paid') {
//             // Update user's total amount
//             await User.findByIdAndUpdate(payment.userId, { $inc: { totalAmount: parseFloat(amount) } });
//         }

//         res.status(200).send('Webhook received successfully');
//     } catch (error) {
//         console.error("Error handling webhook:", error.response ? error.response.data : error.message);
//         res.status(500).json({ message: "Error handling webhook", error: error.message });
//     }
// });

// // @desc   Get all payments by user ID
// // @route  GET /api/payment
// // @access Private
// const getPayments = asyncHandler(async (req, res) => {
//     try {
//         const userId = req.user?._id;
//         console.log("getPayments - User ID:", userId);
//         if (!userId) {
//             console.error("getPayments - User ID not found in request");
//             return res.status(401).json({ message: "Unauthorized" });
//         }

//         // Re-use the payment history logic
//         const payments = await getCryptomusPaymentHistory(req, res);
//         if (res.headersSent) {
//             console.log("getPayments - Headers already sent, returning");
//             return;
//         }
//         console.log("getPayments - payments:", payments);
//         res.status(200).json(payments);
//     } catch (error) {
//         console.error("getPayments - Error fetching payments:", error);
//         res.status(500).json({ message: "Error fetching payments" });
//     }
// });

// // @desc   Test Cryptomus Webhook - for simulating webhook calls during development
// // @route  POST /api/payment/cryptomus/test-webhook
// // @access Private
// const testCryptomusWebhook = asyncHandler(async (req, res) => {
//     try {
//         const { url_callback, currency, network, uuid, order_id, status, amount } = req.body;
//         if (!url_callback || !currency || !network || (!uuid && !order_id) || !status) {
//             return res.status(400).json({ message: "url_callback, currency, network, (uuid or order_id), and status are required." });
//         }
//         if (!amount || isNaN(parseFloat(amount))) {
//             return res.status(400).json({ message: "Amount is required and must be a valid number." });
//         }
//         if (currency !== 'USD') {
//             return res.status(400).json({ message: "Currency must be USD for this test." });
//         }

//         // Construct simulated webhook payload
//         const webhookData = {
//             status,
//             currency,
//             network,
//             amount,
//             order_id
//         };
//         if (uuid) {
//             webhookData.uuid = uuid;
//         }

//         const base64data = Buffer.from(JSON.stringify(webhookData), 'utf8').toString("base64");
//         const signature = crypto
//             .createHash("md5")
//             .update(base64data + CRYPTOMUS_PAYMENT_KEY)
//             .digest("hex");

//         const simulatedHeaders = { signature };

//         // Create mock request and response objects
//         const mockReq = { headers: simulatedHeaders, body: webhookData };
//         const mockRes = {
//             status: (code) => { mockRes.statusCode = code; return mockRes; },
//             send: (message) => { mockRes.message = message; return mockRes; },
//             json: (data) => { mockRes.data = data; return mockRes; }
//         };

//         // Call the webhook handler with the simulated objects
//         await handleCryptomusWebhook(mockReq, mockRes);

//         if (mockRes.statusCode >= 400) {
//             console.error("handleCryptomusWebhook returned an error:", mockRes.statusCode, mockRes.message, mockRes.data);
//             return res.status(500).json({ message: "Error processing test webhook: handleCryptomusWebhook failed", details: { statusCode: mockRes.statusCode, message: mockRes.message, data: mockRes.data } });
//         }
//         res.status(200).json({ message: 'Test webhook processed successfully', handleCryptomusWebhookResponse: { statusCode: mockRes.statusCode, message: mockRes.message, data: mockRes.data } });
//     } catch (error) {
//         console.error("Error processing test webhook:", error.response ? error.response.data : error.message);
//         res.status(500).json({ message: "Error processing test webhook", error: error.message });
//     }
// });

// // @desc   Get all payments by user ID (ADMIN)
// // @route  GET /api/admin/users/:userId/payments
// // @access Private
// const getUserPayments = asyncHandler(async (req, res) => {
//     try {
//         const { userId } = req.params;
//         if (!userId) {
//             console.error("User ID not found in request");
//             return res.status(400).json({ message: "User ID is required" });
//         }
//         const payments = await Payment.find({ userId }).sort({ createdAt: -1 });
//         res.status(200).json(payments);
//     } catch (error) {
//         console.error("Error fetching payments", error);
//         return res.status(500).json({ message: "Error fetching payments" });
//     }
// });

// export { 
//   createCryptomusPayment, 
//   handleCryptomusWebhook, 
//   getPayments, 
//   getCryptomusPaymentHistory, 
//   testCryptomusWebhook, 
//   getUserPayments 
// };
