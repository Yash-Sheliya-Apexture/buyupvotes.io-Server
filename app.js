import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js'; 
import cors from 'cors';  // Import the cors package
import contactRoutes from './routes/contact.js';

dotenv.config();
connectDB();

const app = express();

// Enable CORS for all origins (you can restrict it to specific domains if needed)
app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests from this origin (your frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the necessary HTTP methods 
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers if necessary
  credentials: true, // If you're using cookies or sessions, enable this
}));

app.use(express.json()); // To parse incoming requests with JSON payloads
app.use("/api/auth", authRoutes); // Authentication Routes
app.use('/api/contact', contactRoutes); // Add the Contact Us API

export default app;

