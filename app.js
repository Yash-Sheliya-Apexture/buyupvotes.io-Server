import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';  // Import the cors package
import contactRoutes from './routes/contact.js';

dotenv.config();
connectDB();

const app = express();

// Allow multiple origins (local development and production environment)
const allowedOrigins = [
  'http://localhost:5173', // Localhost for development
  'https://buyupvotes-io-client.vercel.app', // Vercel production frontend URL
];

// Enable CORS for all origins (you can restrict it to specific domains if needed)
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from the listed origins and allow undefined origins for local requests (e.g., Postman, CURL)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the necessary HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers if necessary
  credentials: true, // If you're using cookies or sessions, enable this
}));

app.use(express.json()); // To parse incoming requests with JSON payloads
app.use("/api/auth", authRoutes); // Authentication Routes
app.use('/api/contact', contactRoutes); // Contact Us API

export default app;
