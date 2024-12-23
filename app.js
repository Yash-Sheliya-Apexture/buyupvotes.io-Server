import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';  // Import cors package
import contactRoutes from './routes/contact.js';

dotenv.config();
connectDB();

const app = express();

// Define allowed origins (Vercel production frontend URL)
const allowedOrigins = [
  'https://buyupvotes-io-client.vercel.app', // Vercel production frontend URL
  'http://localhost:5173', // Local development URL (optional, only for local development)
];

// Enable CORS for all origins (with allowed origins)
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies if needed (important if using sessions)
}));

app.use(express.json()); // To parse incoming requests with JSON payloads
app.use("/api/auth", authRoutes); // Authentication Routes
app.use('/api/contact', contactRoutes); // Contact Us API

export default app;
