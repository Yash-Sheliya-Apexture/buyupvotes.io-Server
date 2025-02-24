// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const userCache = new Map();

// const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }

//   const token = authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const userId = decoded.id;

//         // Check if the user is already cached
//       if (userCache.has(userId)) {
//           req.user = userCache.get(userId);
//           return next();
//       }

//       const user = await User.findById(userId).select("-password").lean();

//       if (!user) {
//           return res.status(401).json({ message: "User not found" });
//       }

//       // Cache the user
//       userCache.set(userId, user);
//       req.user = user;
//       next();
//   } catch (error) {
//       console.error("Authentication error:", error.message);
//     res.status(401).json({ message: "Not authorized" });
//   }
// };

// export default authMiddleware;


// // middlewares/authMiddleware.js
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const userCache = new Map();

// const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }

//   const token = authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const userId = decoded.id;

//         // Check if the user is already cached
//       if (userCache.has(userId)) {
//           req.user = userCache.get(userId);
//           return next();
//       }

//       const user = await User.findById(userId).select("-password").lean();

//       if (!user) {
//           return res.status(401).json({ message: "User not found" });
//       }

//       // Cache the user
//       userCache.set(userId, user);
//       req.user = user;
//       next();
//   } catch (error) {
//       console.error("Authentication error:", error.message);
//     res.status(401).json({ message: "Not authorized" });
//   }
// };

// export default authMiddleware;


// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const userCache = new Map();

// const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }

//   const token = authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.id;

//     // Check if the user is already cached
//     let user;
//     if (userCache.has(userId)) {
//       user = userCache.get(userId);
//     } else {
//       user = await User.findById(userId).select("-password").lean();
//       if (user) {
//         userCache.set(userId, user);
//       }
//     }

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     // Attach user to request
//     req.user = {
//       _id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       role: user.role  // Attach role to the user object
//     };
//     next();

//   } catch (error) {
//     console.error("Authentication error:", error.message);
//     res.status(401).json({ message: "Not authorized" });
//   }
// };

// export default authMiddleware;


import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const userCache = new Map();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Check if the user is already cached
    let user;
    if (userCache.has(userId)) {
      user = userCache.get(userId);
    } else {
      user = await User.findById(userId).select("-password"); // Removed .lean()
      if (user) {
        userCache.set(userId, user);
      }
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request
    req.user = user; // Attach the entire Mongoose user object
    next();

  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Not authorized" });
  }
};

export default authMiddleware;