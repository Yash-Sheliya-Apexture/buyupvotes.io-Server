// import User from '../models/User.js'; // Importing the User model
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// // Register controller
// export const register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, confirmPassword } = req.body;

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match.' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists.' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ firstName, lastName, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };

// // Login controller
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials.' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials.' });
//     }

//     // Generate Access Token (12h expiration)
//     const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });

//     // Generate Refresh Token (7 days expiration)
//     const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

//     // Optionally store refreshToken in the database for revocation purposes
//     user.refreshToken = refreshToken;
//     await user.save();

//     res.status(200).json({ accessToken, refreshToken });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };



// // Refresh Token controller
// export const refreshToken = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;

//     if (!refreshToken) {
//       return res.status(400).json({ message: 'Refresh token is required.' });
//     }

//     // Verify Refresh Token
//     const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

//     // Optionally verify the refresh token exists in the database (for extra security)
//     const user = await User.findById(decoded.id);
//     if (!user || user.refreshToken !== refreshToken) {
//       return res.status(403).json({ message: 'Invalid refresh token.' });
//     }

//     // Generate New Access Token
//     const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '12h' });

//     res.status(200).json({ accessToken: newAccessToken });
//   } catch (err) {
//     return res.status(403).json({ message: 'Invalid or expired refresh token.' });
//   }
// };
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register Controller
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Refresh Token Controller
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required.' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token.' });
    }

    const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '12h' });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired refresh token.' });
  }
};


// Get User Data controller (protected route)
export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id; // Access user ID from the token payload
    const user = await User.findById(userId).select('-password'); // Exclude the password field

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};


// import User from '../models/User.js'; // Assuming you have a User model
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// // Register controller
// export const register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, confirmPassword } = req.body;

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match.' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists.' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ firstName, lastName, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };

// // Login controller
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials.' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials.' });
//     }

//     // Create JWT token with user ID as payload
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };

// // Get User Data controller (protected route)
// export const getUserData = async (req, res) => {
//   try {
//     const userId = req.user.id; // Access user ID from the token payload
//     const user = await User.findById(userId).select('-password'); // Exclude the password field

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     res.status(200).json({
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };
