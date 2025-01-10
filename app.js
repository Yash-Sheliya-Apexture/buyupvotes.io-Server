import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import contactRoutes from './routes/contact.js';
import paymentRoutes from './routes/paymentRoutes.js'; // Import payment routes
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorMiddleware.js';

// Environment configuration
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Enable CORS
app.use(cors({
  origin: ['http://localhost:5173'], // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Cookie Parser
app.use(cookieParser());

// Body parser
app.use(express.json());

// Cache control headers
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payment", paymentRoutes); // Payment routes

// Error handler middleware
app.use(errorHandler);

export default app;