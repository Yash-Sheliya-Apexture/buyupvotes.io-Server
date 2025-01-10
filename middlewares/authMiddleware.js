import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1];


  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Attach user without password
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Not authorized" });
  }
};

export default authMiddleware;