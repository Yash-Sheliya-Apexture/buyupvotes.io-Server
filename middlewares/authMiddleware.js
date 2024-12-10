// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ message: "Access denied." });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: "Invalid token." });
//   }
// };

// export default authMiddleware;


import jwt from 'jsonwebtoken';

// Middleware to authenticate the token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token using your secret key
    req.user = decoded; // Add user info to request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });  // Handle invalid token
  }
};

export default authMiddleware;
