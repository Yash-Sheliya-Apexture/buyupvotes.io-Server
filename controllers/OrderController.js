import { getOrdersFromSheet, appendDataToSheet } from '../utils/googleSheets.js'; // Adjust path as needed
import { v4 as uuidv4 } from 'uuid';  // Import the uuid package

export const getUserOrders = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(404).json({ message: 'User not found. Please authenticate and try again.' });
    }

    const userId = String(req.user.id).trim();
    console.log('Looking for orders for user:', userId);

    console.log('Fetching orders from Google Sheets...');
    const allOrders = await getOrdersFromSheet();

    const userOrders = allOrders.filter(order => {
      const orderUserId = String(order.userId).trim();
      return orderUserId === userId;
    });

    if (!userOrders.length) {
      return res.status(200).json({ message: 'No orders found for this user.' });
    }

    res.status(200).json(userOrders);
  } catch (err) {
    console.error('Error fetching user orders:', err.message);
    res.status(500).json({ message: 'Failed to retrieve orders. Please try again later.' });
  }
};

export const saveOrderToSheet = async (req, res) => {
  const { service, speed, link, quantity } = req.body;

  try {
    if (!service || !speed || !link || !quantity) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity < 5 || parsedQuantity > 1000) {
      return res.status(400).json({ message: 'Quantity must be a number between 5 and 1000.' });
    }

    const orderId = uuidv4();
    const status = 'Pending';
    const started = 'Not Started';

    await appendDataToSheet({
      orderId,
      userId: String(req.user.id).trim(),
      service,
      speed,
      link,
      quantity: parsedQuantity,
      started,
      status,
    });

    res.status(200).json({ message: 'Order submitted successfully!' });
  } catch (err) {
    console.error('Error while saving order:', err.message);
    res.status(500).json({ message: 'Failed to save order. Please try again later.' });
  }
};
