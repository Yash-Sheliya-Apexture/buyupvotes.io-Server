import { appendDataToSheet } from '../utils/googleSheets.js';  // Import the googleSheets helper

export const saveOrderToSheet = async (req, res) => {
  const { service, speed, link, quantity } = req.body;

  try {
    // Validate the form data first (basic checks for service, speed, link, and quantity)
    if (!service || !speed || !link || !quantity) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Additional validation for quantity, if needed
    if (!/^\d+$/.test(quantity) || parseInt(quantity) < 5 || parseInt(quantity) > 1000) {
      return res.status(400).json({ message: 'Quantity must be a valid number between 5 and 1000' });
    }

    // Append data to Google Sheets
    await appendDataToSheet({ service, speed, link, quantity });

    // Respond with success
    res.status(200).json({ message: 'Order submitted successfully!' });
  } catch (err) {
    console.error('Error while saving to sheet:', err);
    res.status(500).json({ message: 'Failed to save order to Google Sheets' });
  }
};
