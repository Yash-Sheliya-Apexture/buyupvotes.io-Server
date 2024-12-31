// import Contact from '../models/Contact.js';

// // Handle Contact Form Submission
// export const submitContact = async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;

//     // Validate required fields
//     if (!name || !email || !subject || !message) {
//       return res.status(400).json({ error: 'All fields are required.' });
//     }

//     // Save the contact data to the database
//     const newContact = await Contact.create({ name, email, subject, message });

//     res.status(201).json({
//       message: 'Your message has been received. We will get back to you soon!',
//       contact: newContact,
//     });
//   } catch (error) {
//     console.error('Error submitting contact form:', error);
//     res.status(500).json({ error: 'An error occurred while submitting your message.' });
//   }
// };



import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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


    // Define the admin email options
    const adminMailOptions = {
      from: process.env.SMTP_USER, // Your admin email address
      to: process.env.ADMIN_EMAIL, // The admin's email address (load from env)
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
         <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    console.log("adminMailOptions:", adminMailOptions); // Log the email options


    // Send email to admin
     try{
         await transporter.sendMail(adminMailOptions);
    } catch (emailError){
      console.error('Error sending email to admin', emailError);
    }

    res.status(201).json({
      message: 'Your message has been received. We will get back to you soon!',
      contact: newContact,
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'An error occurred while submitting your message.' });
  }
};