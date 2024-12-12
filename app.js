import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js'; 
import cors from 'cors';  // Import the cors package

dotenv.config();
connectDB();

const app = express();

// Enable CORS for all origins (you can restrict it to specific domains if needed)
app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests from this origin (your frontend)
  methods: ['GET', 'POST'], // Allow only specific methods if necessary
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers if necessary
}));

app.use(express.json()); // To parse incoming requests with JSON payloads
app.use("/api/auth", authRoutes); // Authentication Routes

export default app;

