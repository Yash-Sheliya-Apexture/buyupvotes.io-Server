// // app.js
// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import authRoutes from './routes/auth.js';
// import cors from 'cors';
// import contactRoutes from './routes/contact.js';
// import paymentRoutes from './routes/paymentRoutes.js';
// import cookieParser from 'cookie-parser';
// import { errorHandler } from './middlewares/errorMiddleware.js';
// import helmet from 'helmet'; // Import Helmet
// import compression from 'compression'; // Import Compression
// import morgan from 'morgan'; // Import Morgan for logging

// // Environment configuration
// dotenv.config();

// // Connect to database
// connectDB();

// const app = express();

// // Security headers with Helmet
// app.use(helmet());

// // Compress responses
// app.use(compression());


// //Logging
// app.use(morgan('dev'))



// // Enable CORS
// app.use(cors({
//   origin: ['http://localhost:5173'], // Frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));

// // Cookie Parser
// app.use(cookieParser());

// // Body parser
// app.use(express.json({ limit: '10kb' })); // Limit json payload size

// // Cache control headers
// app.use((req, res, next) => {
//   res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
//   res.setHeader("Pragma", "no-cache");
//   res.setHeader("Expires", "0");
//   next();
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/payment", paymentRoutes);

// // Error handler middleware
// app.use(errorHandler);

// export default app;









import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import contactRoutes from './routes/contact.js';
import paymentRoutes from './routes/paymentRoutes.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorMiddleware.js';
import helmet from 'helmet'; // Import Helmet
import compression from 'compression'; // Import Compression
import morgan from 'morgan'; // Import Morgan for logging

// Environment configuration
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security headers with Helmet
app.use(helmet());

// Compress responses
app.use(compression());

//Logging
app.use(morgan('dev'))

// Enable CORS
app.use(cors({
  origin: ['https://buyupvotes-io-client.vercel.app'], // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Cookie Parser
app.use(cookieParser());

// Body parser
app.use(express.json({ limit: '10kb' })); // Limit json payload size

// Cache control headers
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// Health Check Endpoint  <---- ADDED THIS
app.get('/health', (req, res) => {
  res.status(200).send('OK'); // Or a simple JSON object:  res.status(200).json({ status: 'OK' });
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payment", paymentRoutes);

// Error handler middleware
app.use(errorHandler);

export default app;