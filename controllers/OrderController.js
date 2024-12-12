// import { appendDataToSheet } from '../utils/googleSheets.js';  // Import the googleSheets helper

// export const saveOrderToSheet = async (req, res) => {
//   const { service, speed, link, quantity } = req.body;

//   try {
//     // Validate the form data first (basic checks for service, speed, link, and quantity)
//     if (!service || !speed || !link || !quantity) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Additional validation for quantity, if needed
//     if (!/^\d+$/.test(quantity) || parseInt(quantity) < 5 || parseInt(quantity) > 1000) {
//       return res.status(400).json({ message: 'Quantity must be a valid number between 5 and 1000' });
//     }

//     // Append data to Google Sheets
//     await appendDataToSheet({ service, speed, link, quantity });

//     // Respond with success
//     res.status(200).json({ message: 'Order submitted successfully!' });
//   } catch (err) {
//     console.error('Error while saving to sheet:', err);
//     res.status(500).json({ message: 'Failed to save order to Google Sheets' });
//   }
// };




// import { appendDataToSheet } from '../utils/googleSheets.js';  // Import the googleSheets helper
// import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique order IDs
// import { getOrdersFromSheet } from '../utils/googleSheets.js'; // Import utility for fetching orders

// export const saveOrderToSheet = async (req, res) => {
//   const { service, speed, link, quantity } = req.body;

//   try {
//     // Validate the form data first (basic checks for service, speed, link, and quantity)
//     if (!service || !speed || !link || !quantity) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Additional validation for quantity, if needed
//     if (!/^\d+$/.test(quantity) || parseInt(quantity) < 5 || parseInt(quantity) > 1000) {
//       return res.status(400).json({ message: 'Quantity must be a valid number between 5 and 1000' });
//     }

//     // Generate a unique order ID and set default status to "In Progress"
//     const orderId = uuidv4();
//     const status = "In Progress";

//     // Append data to Google Sheets without userId
//     await appendDataToSheet({
//       orderId,
//       service,
//       speed,
//       link,
//       quantity,
//       status,
//     });

//     // Respond with success
//     res.status(200).json({ message: 'Order submitted successfully!' });
//   } catch (err) {
//     console.error('Error while saving to sheet:', err);
//     res.status(500).json({ message: 'Failed to save order to Google Sheets' });
//   }
// };

// // Get Orders for a specific user
// export const getUserOrders = async (req, res) => {
//   try {
//     const userId = req.user.id; // Extract userId from the authenticated user (via token)

//     // Fetch all orders from Google Sheets
//     const allOrders = await getOrdersFromSheet();

//     // Filter orders for the logged-in user
//     const userOrders = allOrders.filter(order => order.userId === userId);

//     res.status(200).json(userOrders); // Return only the orders for this user
//   } catch (error) {
//     console.error('Error fetching user orders:', error);
//     res.status(500).json({ message: 'Failed to fetch orders for the user' });
//   }
// };






// export const getOrdersFromSheet = async () => {
//   const auth = authenticateGoogleSheets();
//   const sheets = google.sheets({ version: 'v4', auth });
//   const spreadsheetId = '16mjIgnRXcoxXw9Se404dSeO2Y9oRRvGaCk8C9HlYysM'; // Replace with your Google Sheets ID
//   try {
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: 'Sheet1!A:H', // Include User ID (Column B)
//     });

//     const orders = response.data.values?.slice(1).map(row => ({
//       orderId: row[0],
//       userId: row[1], // Retrieve User ID
//       service: row[2],
//       speed: row[3],
//       link: row[4],
//       quantity: row[5],
//       date: row[6],
//       status: row[7],
//     }));

//     return orders || [];
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     throw error;
//   }
// };



// import { appendDataToSheet } from '../utils/googleSheets.js'; // Google Sheets helper
// import { v4 as uuidv4 } from 'uuid'; // For unique order IDs
// import { getOrdersFromSheet } from '../utils/googleSheets.js'; // Fetch orders utility

// // Save Order to Google Sheets
// export const saveOrderToSheet = async (req, res) => {
//   const { service, speed, link, quantity } = req.body;

//   try {
//     // Validate required fields
//     if (!service || !speed || !link || !quantity) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     // Validate quantity (e.g., 5 to 1000)
//     const parsedQuantity = parseInt(quantity, 10);
//     if (isNaN(parsedQuantity) || parsedQuantity < 5 || parsedQuantity > 1000) {
//       return res.status(400).json({ message: 'Quantity must be a number between 5 and 1000.' });
//     }

//     // Generate order ID and set default status
//     const orderId = uuidv4();
//     const status = "In Progress";

//     // Append order to Google Sheets
//     await appendDataToSheet({
//       orderId,
//       userId: req.user.id, // Assuming authMiddleware adds `req.user`
//       service,
//       speed,
//       link,
//       quantity: parsedQuantity,
//       status,
//     });

//     res.status(200).json({ message: 'Order submitted successfully!' });
//   } catch (err) {
//     console.error('Error while saving order:', err.message);
//     res.status(500).json({ message: 'Failed to save order. Please try again later.' });
//   }
// };

// // Get Orders for Logged-in User
// export const getUserOrders = async (req, res) => {
//   try {
//     const userId = req.user.id; // Authenticated user ID

//     // Fetch all orders from Google Sheets
//     const allOrders = await getOrdersFromSheet();

//     // Filter orders for this user
//     const userOrders = allOrders.filter(order => order.userId === userId);

//     if (!userOrders.length) {
//       return res.status(404).json({ message: 'No orders found for this user.' });
//     }

//     res.status(200).json(userOrders);
//   } catch (err) {
//     console.error('Error fetching user orders:', err.message);
//     res.status(500).json({ message: 'Failed to retrieve orders. Please try again later.' });
//   }
// };


import { getOrdersFromSheet, appendDataToSheet } from '../utils/googleSheets.js'; // Adjust path as needed
import { v4 as uuidv4 } from 'uuid';  // Import the uuid package

// export const getUserOrders = async (req, res) => {
//   try {
//     // Get the user ID from the request (the authenticated user)
//     const userId = req.user.id;
//     console.log('Looking for orders for user:', userId);  // Log the userId to verify

//     // Fetch all orders
//     const allOrders = await getOrdersFromSheet();
//     console.log('All orders:', allOrders);

//     // Log the userId being used in the request
//     const trimmedUserId = String(userId).trim();
//     console.log('Trimmed request user ID:', trimmedUserId);

//     // Log each order’s userId to ensure they are correct
//     allOrders.forEach(order => {
//       console.log(`Order ID: ${order.orderId}, User ID in order: ${order.userId}`);
//     });

//     // Filter orders by matching userId (ensure both are strings)
//     const userOrders = allOrders.filter(order => {
//       const orderUserId = String(order.userId).trim();
//       console.log(`Comparing: Request User ID (${trimmedUserId}) with Order User ID (${orderUserId})`);
//       return orderUserId === trimmedUserId;
//     });

//     // console.log('Filtered user orders:', userOrders);

//     // If no orders are found for this user, return a 404 response
//     if (!userOrders.length) {
//       return res.status(404).json({ message: 'No orders found for this user.' });
//     }

//     // Send filtered orders as response
//     res.status(200).json(userOrders);
//   } catch (err) {
//     console.error('Error fetching user orders:', err.message);
//     res.status(500).json({ message: 'Failed to retrieve orders. Please try again later.' });
//   }
// };



export const getUserOrders = async (req, res) => {
  try {
    // Ensure the authenticated user's ID is present
    if (!req.user || !req.user.id) {
      return res.status(404).json({ message: 'User not found. Please authenticate and try again.' });
    }

    // Get the user ID from the request (authenticated user)
    const userId = req.user.id.trim();
    console.log('Looking for orders for user:', userId);

    // Fetch all orders from the sheet
    const allOrders = await getOrdersFromSheet();
    console.log('All orders:', allOrders);

    // Log each order’s userId to ensure they are correct
    allOrders.forEach(order => {
      console.log(`Order ID: ${order.orderId}, User ID in order: ${order.userId}`);
    });

    // Filter orders by matching userId (ensure both are strings)
    const userOrders = allOrders.filter(order => {
      const orderUserId = String(order.userId).trim();
      console.log(`Comparing: Request User ID (${userId}) with Order User ID (${orderUserId})`);
      return orderUserId === userId;
    });

    // If no orders are found for this user, return a 404 response
    if (!userOrders.length) {
      return res.status(300).json({ message: 'No orders found for this user.' });
    }

    // Send filtered orders as response
    res.status(200).json(userOrders);
  } catch (err) {
    console.error('Error fetching user orders:', err.message);

    // Handle specific errors that might indicate a 404-like scenario
    if (err.code === '404' || err.message.includes('not found')) {
      return res.status(404).json({ message: 'Orders not found. Please try again later.' });
    }

    // Handle generic errors
    res.status(500).json({ message: 'Failed to retrieve orders. Please try again later.' });
  }
};




// Save Order to Google Sheets
export const saveOrderToSheet = async (req, res) => {
  const { service, speed, link, quantity } = req.body;

  try {
    // Validate required fields
    if (!service || !speed || !link || !quantity) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity < 5 || parsedQuantity > 1000) {
      return res.status(400).json({ message: 'Quantity must be a number between 5 and 1000.' });
    }

    // Generate order ID and set default status
    const orderId = uuidv4();
    const status = 'In Progress';

    // Ensure the correct user ID is being passed
    await appendDataToSheet({
      orderId,
      userId: req.user.id,  // This should be the authenticated user ID
      service,
      speed,
      link,
      quantity: parsedQuantity,
      status,
    });

    res.status(200).json({ message: 'Order submitted successfully!' });
  } catch (err) {
    console.error('Error while saving order:', err.message);
    res.status(500).json({ message: 'Failed to save order. Please try again later.' });
  }
};


// export const getUserOrders = async (req, res) => {
//   try {
//     const userId = req.user.id; // Make sure this is the correct user ID!
//     console.log('Looking for orders for user:', userId);

//     const allOrders = await getOrdersFromSheet();
//     console.log('All orders:', allOrders);

//     // Log each order's userId to check for any inconsistencies
//     allOrders.forEach(order => {
//       console.log(`Order ID: ${order.orderId}, User ID in order: ${order.userId}`);
//     });

//     // Filter orders for this user
//     const userOrders = allOrders.filter(order => order.userId === userId);
//     console.log('Filtered user orders:', userOrders);

//     if (!userOrders.length) {
//       return res.status(404).json({ message: 'No orders found for this user.' });
//     }

//     res.status(200).json(userOrders);
//   } catch (err) {
//     console.error('Error fetching user orders:', err.message);
//     res.status(500).json({ message: 'Failed to retrieve orders. Please try again later.' });
//   }
// };
