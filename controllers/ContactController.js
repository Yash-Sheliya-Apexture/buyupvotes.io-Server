import Contact from '../models/Contact.js';

// Handle Contact Form Submission
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Save the contact data to the database
    const newContact = await Contact.create({ name, email, subject, message });

    res.status(201).json({
      message: 'Your message has been received. We will get back to you soon!',
      contact: newContact,
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'An error occurred while submitting your message.' });
  }
};
