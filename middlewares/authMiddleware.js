// import jwt from 'jsonwebtoken';

// // Middleware to authenticate the token
// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header

//   if (!token) {
//     return res.status(401).json({ message: 'Access Denied. No token provided.' });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token using your secret key
//     req.user = decoded; // Add user info to request object
//     next(); // Proceed to the next middleware/route handler
//   } catch (error) {
//     return res.status(400).json({ message: 'Invalid token.' });  // Handle invalid token
//   }
// };

// export default authMiddleware;


// import jwt from 'jsonwebtoken';

// // Middleware to authenticate the token
// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header

//   if (!token) {
//     return res.status(401).json({ message: 'Access Denied. No token provided.' });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token using your secret key
//     req.user = decoded; // Add user info to request object
//     next(); // Proceed to the next middleware/route handler
//   } catch (error) {
//     return res.status(400).json({ message: 'Invalid token.' });  // Handle invalid token
//   }
// };

// export default authMiddleware;

// import jwt from 'jsonwebtoken';

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Authorization token missing.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user info to the request
//     next();
//   } catch (err) {
//     res.status(403).json({ message: 'Invalid or expired token.' });
//   }
// };

// export default authMiddleware;


// // authMiddleware.js
// import jwt from 'jsonwebtoken';

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Get token from "Authorization" header

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided, authorization denied.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the access token
//     req.user = decoded; // Attach the decoded user information to the request object
//     next();  // Proceed to the next middleware/route handler
//   } catch (err) {
//     console.error(err);
//     res.status(403).json({ message: 'Token is not valid or expired.' });
//   }
// };

// export default authMiddleware;  // Default export

import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from "Authorization" header

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the access token
    req.user = decoded; // Attach the decoded user information to the request object
    next();  // Proceed to the next middleware/route handler
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: 'Token is not valid or expired.' });
  }
};

export default authMiddleware;
