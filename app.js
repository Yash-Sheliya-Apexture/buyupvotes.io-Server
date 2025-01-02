// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import authRoutes from './routes/auth.js';
// import cors from 'cors';  // Import cors package
// import contactRoutes from './routes/contact.js';

// dotenv.config();
// connectDB();

// const app = express();

// // Define allowed origins (Vercel production frontend URL)
// const allowedOrigins = [
//   'https://buyupvotes-io-client.vercel.app', // Vercel production frontend URL
//   'http://localhost:5173', // Local development URL (optional, only for local development)
// ];

// // Enable CORS for all origins (with allowed origins)
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true); // Allow the origin
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//   credentials: true, // Allow cookies if needed (important if using sessions)
// }));

// app.use((req, res, next) => {
//   res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
//   res.setHeader("Pragma", "no-cache");
//   res.setHeader("Expires", "0");
//   next();
// });

// app.use(express.json()); // To parse incoming requests with JSON payloads
// app.use("/api/auth", authRoutes); // Authentication Routes
// app.use('/api/contact', contactRoutes); // Contact Us API

// export default app;



// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import authRoutes from './routes/auth.js';
// import cors from 'cors';
// import contactRoutes from './routes/contact.js';
// import NodeCache from 'node-cache';
// import fs from 'fs-extra'; // For file operations

// dotenv.config();
// connectDB();

// const app = express();

// // Set up cache with file persistence
// const myCache = new NodeCache({ 
//   stdTTL: 3600, 
//   checkperiod: 600,
//   useClones: false
// });

// // Save cache to disk manually
// const saveCacheToDisk = () => {
//   const cacheData = myCache.getStats();
//   fs.writeJsonSync('./cache.json', cacheData); // Save cache to a JSON file
// };

// // Load cache from disk on start
// const loadCacheFromDisk = () => {
//   try {
//     const cachedData = fs.readJsonSync('./cache.json');
//     if (cachedData) {
//       // Load the cache data from the file
//       myCache.mset(cachedData.keys);
//     }
//   } catch (error) {
//     console.error('No previous cache found, starting fresh.');
//   }
// };

// loadCacheFromDisk();

// app.use(cors({
//   origin: ['http://localhost:5173'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));

// // Cache control headers - Disable caching for the API responses
// app.use((req, res, next) => {
//   res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
//   res.setHeader("Pragma", "no-cache");
//   res.setHeader("Expires", "0");
//   next();
// });

// // Middleware to parse incoming JSON requests
// app.use(express.json());

// // API Routes
// app.use("/api/auth", authRoutes);
// app.use('/api/contact', contactRoutes);

// // Example route with cache
// app.get('/api/contact', async (req, res) => {
//   const cacheKey = 'contact-data';

//   // Check if data is in cache
//   const cachedData = myCache.get(cacheKey);
//   if (cachedData) {
//     console.log('Returning cached contact data');
//     return res.json(cachedData);
//   }

//   // Get data from DB (simulated)
//   const dataFromDb = await getContactDataFromDB();

//   // Cache it
//   myCache.set(cacheKey, dataFromDb);
//   console.log('Data retrieved from DB and cached');

//   // Save cache to disk periodically
//   saveCacheToDisk();

//   return res.json(dataFromDb);
// });

// async function getContactDataFromDB() {
//   return { message: 'Contact data from MongoDB' };
// }

// export default app;




// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js'; // Ensure you have proper DB connection setup
// import authRoutes from './routes/auth.js'; // Authentication routes (sign in, sign up, etc.)
// import cors from 'cors';  // Import cors package
// import contactRoutes from './routes/contact.js'; // Contact form or any related routes

// dotenv.config();  // Load environment variables
// connectDB(); // Establish database connection

// const app = express();

// app.use(cors({
//   origin: ['http://localhost:5173'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true, // Important if you're using cookies for authentication
// }));

// // Cache control headers - Disable caching for the API responses
// app.use((req, res, next) => {
//   res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
//   res.setHeader("Pragma", "no-cache");
//   res.setHeader("Expires", "0");
//   next();
// });

// // Middleware to parse incoming JSON requests
// app.use(express.json()); // To parse incoming requests with JSON payloads

// // API Routes
// app.use("/api/auth", authRoutes); // Authentication Routes (signup, login, etc.)
// app.use('/api/contact', contactRoutes); // Contact Us Routes (if you have contact form, etc.)

// export default app;


// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import authRoutes from './routes/auth.js';
// import cors from 'cors';
// import contactRoutes from './routes/contact.js';
// import cookieParser from 'cookie-parser'; // Import cookie-parser

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors({
//   origin: ['http://localhost:5173'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true, // Important for cookies
// }));
// app.use(cookieParser()); // Add cookie-parser middleware

// // Cache control headers
// app.use((req, res, next) => {
//   res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
//   res.setHeader("Pragma", "no-cache");
//   res.setHeader("Expires", "0");
//   next();
// });

// app.use(express.json());
// app.use("/api/auth", authRoutes);
// app.use('/api/contact', contactRoutes);

// export default app;


import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import contactRoutes from './routes/contact.js';
import paymentRoutes from './routes/paymentRoutes.js'; // Import payment routes
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorMiddleware.js';


dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ['https://buyupvotes-io-client.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Important for cookies
}));
app.use(cookieParser()); // Add cookie-parser middleware


// Cache control headers
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/payment", paymentRoutes); // Use payment routes

app.use(errorHandler);

export default app;