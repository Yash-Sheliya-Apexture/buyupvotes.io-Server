// // controllers/OrderController.js
// import { getOrdersFromSheet, appendDataToSheet, updateDataFromSheet } from '../utils/googleSheets.js'; // Import updateDataFromSheet
// import { v4 as uuidv4 } from 'uuid';

// export const getUserOrders = async (req, res) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(404).json({ message: 'User not found. Please authenticate and try again.' });
//     }

//     const userId = String(req.user._id).trim();
//     console.log('Looking for orders for user:', userId);

//     console.log('Fetching orders from Google Sheets...');
//     const allOrders = await getOrdersFromSheet();

//     const userOrders = allOrders.filter(order => {
//       const orderUserId = String(order.userId).trim();
//       return orderUserId === userId;
//     });

//     if (!userOrders.length) {
//       return res.status(200).json({ message: 'No orders found for this user.' });
//     }

//     res.status(200).json(userOrders);
//   } catch (err) {
//     console.error('Error fetching user orders:', err.message);
//     res.status(500).json({ message: 'Failed to retrieve orders. Please try again later.' });
//   }
// };


// export const saveOrderToSheet = async (req, res) => {
//   const { service, speed, link, quantity } = req.body;

//   try {
//     if (!service || !speed || !link || !quantity) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const parsedQuantity = parseInt(quantity, 10);
//     if (isNaN(parsedQuantity) || parsedQuantity < 5 || parsedQuantity > 1000) {
//       return res.status(400).json({ message: 'Quantity must be a number between 5 and 1000.' });
//     }

//     const orderId = uuidv4();
//     const status = 'Pending';
//     const started = 'Not Started';

//     await appendDataToSheet({
//       orderId,
//       userId: String(req.user._id).trim(),
//       service,
//       speed,
//       link,
//       quantity: parsedQuantity,
//       started,
//       status,
//     });

//     res.status(200).json({ message: 'Order submitted successfully!' });
//   } catch (err) {
//     console.error('Error while saving order:', err.message);
//     res.status(500).json({ message: 'Failed to save order. Please try again later.' });
//   }
// };

// export const cancelOrder = async (req, res) => {
//     const { orderId } = req.params;
//     try {
//         if (!orderId) {
//             return res.status(400).json({ message: "Order ID is required." });
//         }

//         const updated = await updateDataFromSheet(orderId, 'Canceled');

//         if (updated) {
//             return res.status(200).json({ message: "Order canceled successfully." });
//         }
//         return res.status(404).json({ message: "Order not found." });

//     } catch (error) {
//         console.error("Error cancelling order:", error.message);
//         res.status(500).json({ message: "Failed to cancel order. Please try again later." });
//     }
// };







// import { getOrdersFromSheet, appendDataToSheet, updateDataFromSheet } from '../utils/googleSheets.js'; // Import updateDataFromSheet
// import { v4 as uuidv4 } from 'uuid';

// export const getUserOrders = async (req, res) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(404).json({ message: 'User not found. Please authenticate and try again.' });
//     }

//     const userId = String(req.user._id).trim();
//     console.log('Looking for orders for user:', userId);

//     console.log('Fetching orders from Google Sheets...');
//     const allOrders = await getOrdersFromSheet();

//     const userOrders = allOrders.filter(order => {
//       const orderUserId = String(order.userId).trim();
//       return orderUserId === userId;
//     });

//     if (!userOrders.length) {
//       return res.status(200).json({ message: 'No orders found for this user.' });
//     }

//     res.status(200).json(userOrders);
//   } catch (err) {
//     console.error('Error fetching user orders:', err.message);
//     res.status(500).json({ message: 'Failed to retrieve orders. Please try again later.' });
//   }
// };


// export const saveOrderToSheet = async (req, res) => {
//   const { category, service, link, quantity, comments, calculatedPrice } = req.body; // Include comments

//   try {
//     if (!category || !service || !link || !quantity) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const parsedQuantity = parseInt(quantity, 10);
//     if (isNaN(parsedQuantity) || parsedQuantity < 5 || parsedQuantity > 1000) {
//       return res.status(400).json({ message: 'Quantity must be a number between 5 and 1000.' });
//     }

//     const orderId = uuidv4();
//     const status = 'Pending';
//     const started = 'Not Started';

//     await appendDataToSheet({
//       orderId,
//       userId: String(req.user._id).trim(),
//       category,
//       service,
//       link,
//       quantity: parsedQuantity,
//       comments, // Save the comments
//       started,
//       status,
//     });

//     res.status(200).json({ message: 'Order submitted successfully!' });
//   } catch (err) {
//     console.error('Error while saving order:', err.message);
//     res.status(500).json({ message: 'Failed to save order. Please try again later.' });
//   }
// };

// export const cancelOrder = async (req, res) => {
//     const { orderId } = req.params;
//     try {
//         if (!orderId) {
//             return res.status(400).json({ message: "Order ID is required." });
//         }

//         const updated = await updateDataFromSheet(orderId, 'Canceled');

//         if (updated) {
//             return res.status(200).json({ message: "Order canceled successfully." });
//         }
//         return res.status(404).json({ message: "Order not found." });

//     } catch (error) {
//         console.error("Error cancelling order:", error.message);
//         res.status(500).json({ message: "Failed to cancel order. Please try again later." });
//     }
// };



// import Order from '../models/Order.js';
// import { v4 as uuidv4 } from 'uuid';

// export const getUserOrders = async (req, res) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(404).json({ message: 'User not found. Please authenticate and try again.' });
//     }

//     const userId = String(req.user._id).trim();
//     console.log('Looking for orders for user:', userId);

//     const userOrders = await Order.find({ userId }); // Find orders by userId

//     if (!userOrders.length) {
//       return res.status(200).json({ message: 'No orders found for this user.' });
//     }

//     res.status(200).json(userOrders);
//   } catch (err) {
//     console.error('Error fetching user orders:', err.message);
//     res.status(500).json({ message: 'Failed to retrieve orders. Please try again later.' });
//   }
// };

// export const saveOrder = async (req, res) => {  // Change function name for clarity
//   const { category, service, link, quantity, comments, calculatedPrice } = req.body; // Include comments

//   try {
//     if (!category || !service || !link || !quantity) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const parsedQuantity = parseInt(quantity, 10);
//     if (isNaN(parsedQuantity) || parsedQuantity < 5 || parsedQuantity > 1000) {
//       return res.status(400).json({ message: 'Quantity must be a number between 5 and 1000.' });
//     }

//     const orderId = uuidv4();
//     const status = 'Pending';
//     const started = 'Not Started';

//     const newOrder = new Order({  // Create a new Order document
//       orderId,
//       userId: String(req.user._id).trim(),
//       category,
//       service,
//       link,
//       quantity: parsedQuantity,
//       comments,
//       started,
//       status,
//     });

//     await newOrder.save(); // Save the new order to MongoDB

//     res.status(200).json({ message: 'Order submitted successfully!' });
//   } catch (err) {
//     console.error('Error while saving order:', err.message);
//     res.status(500).json({ message: 'Failed to save order. Please try again later.' });
//   }
// };

// export const cancelOrder = async (req, res) => {
//   const { orderId } = req.params;
//   try {
//     if (!orderId) {
//       return res.status(400).json({ message: "Order ID is required." });
//     }

//     const order = await Order.findOne({ orderId });

//         if (!order) {
//             return res.status(404).json({ message: "Order not found." });
//         }
//         order.status = 'Canceled';
//         await order.save();

//         return res.status(200).json({ message: "Order canceled successfully." });
//   } catch (error) {
//     console.error("Error cancelling order:", error.message);
//     res.status(500).json({ message: "Failed to cancel order. Please try again later." });
//   }
// };







import Order from '../models/Order.js';
import { v4 as uuidv4 } from 'uuid';

export const getUserOrders = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(404).json({ message: 'User not found. Please authenticate and try again.' });
    }

    const userId = String(req.user._id).trim();
    console.log('Looking for orders for user:', userId);

    const userOrders = await Order.find({ userId }); // Find orders by userId

    if (!userOrders.length) {
      return res.status(200).json({ message: 'No orders found for this user.' });
    }

    res.status(200).json(userOrders);
  } catch (err) {
    console.error('Error fetching user orders:', err.message);
    res.status(500).json({ message: 'Failed to retrieve orders. Please try again later.' });
  }
};

export const saveOrder = async (req, res) => {  // Change function name for clarity
  const { category, service, link, quantity, comments, calculatedPrice } = req.body; // Include comments and calculatedPrice

  try {
    if (!category || !service || !link || !quantity) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity < 5 || parsedQuantity > 1000) {
      return res.status(400).json({ message: 'Quantity must be a number between 5 and 1000.' });
    }

    const orderId = uuidv4();
    const status = 'Pending';
    const started = 'Not Started';

    const newOrder = new Order({  // Create a new Order document
      orderId,
      userId: String(req.user._id).trim(),
      category,
      service,
      link,
      quantity: parsedQuantity,
      comments,
      started,
      status,
      calculatedPrice // Include calculatedPrice here
    });

    await newOrder.save(); // Save the new order to MongoDB

    res.status(200).json({ message: 'Order submitted successfully!' });
  } catch (err) {
    console.error('Error while saving order:', err.message);
    res.status(500).json({ message: 'Failed to save order. Please try again later.' });
  }
};

export const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required." });
    }

    const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }
        order.status = 'Canceled';
        await order.save();

        return res.status(200).json({ message: "Order canceled successfully." });
  } catch (error) {
    console.error("Error cancelling order:", error.message);
    res.status(500).json({ message: "Failed to cancel order. Please try again later." });
  }
};