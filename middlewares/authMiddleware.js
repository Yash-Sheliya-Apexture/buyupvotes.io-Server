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

// export default authMiddleware;


// import jwt from 'jsonwebtoken';

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token provided.' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Token expired', code: 'TOKEN_EXPIRED' });
//     }
//     res.status(403).json({ message: 'Invalid token.' });
//   }
// };

// export default authMiddleware;


// import jwt from 'jsonwebtoken';

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token provided.' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach decoded token to req.user
//     next(); // Proceed to the next middleware/route handler
//   } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Token expired', code: 'TOKEN_EXPIRED' });
//     }
//     res.status(403).json({ message: 'Invalid token.' });
//   }
// };

// export default authMiddleware;


// import jwt from 'jsonwebtoken';

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Extract token from the Authorization header

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided, authorization denied.' });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;  // Attach the user info to the request object
//     next();  // Proceed to the next middleware or route handler
//   } catch (err) {
//     console.error('Token verification failed:', err.message);
//     return res.status(401).json({ message: 'Invalid or expired token, authorization denied.' });
//   }
// };

// export default authMiddleware;



// import jwt from 'jsonwebtoken';

// // Middleware to authenticate users based on JWT token
// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided, authorization denied.' });
//   }

//   try {
//     // Verify the token and decode the user info
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;  // Attach decoded user information to request object
//     next();  // Proceed to the next middleware or route handler
//   } catch (err) {
//     console.error('Token verification failed:', err.message);
//     return res.status(401).json({ message: 'Invalid or expired token, authorization denied.' });
//   }
// };

// export default authMiddleware;



// authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach the user info to the request object
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token, authorization denied.' });
  }
};

export default authMiddleware;
