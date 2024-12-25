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
import nodemailer from 'nodemailer'; // You'll need to set up nodemailer to send emails
import { randomBytes } from 'crypto';  // Import only randomBytes from crypto

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

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

    // Generate tokens
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '12h' } // Access token expires in 12 hours
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' } // Refresh token expires in 7 days
    );

    // Store the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    // Send tokens to the client
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};


// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required." });
//     }

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email." }); // More specific message for email
//     }

//     // Verify password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid password." }); // Specific message for password mismatch
//     }

//     // Generate tokens
//     const accessToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "12h" } // Access token expires in 12 hours
//     );

//     const refreshToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_REFRESH_SECRET,
//       { expiresIn: "7d" } // Refresh token expires in 7 days
//     );

//     // Store the refresh token in the database
//     user.refreshToken = refreshToken;
//     await user.save();

//     // Send tokens to the client
//     res.status(200).json({ accessToken, refreshToken });
//   } catch (err) {
//     console.error("Login error:", err);
//     if (process.env.NODE_ENV === 'production') {
//       return res.status(500).json({ message: "Server error. Please try again later." });
//     }
//     return res.status(500).json({ message: err.message });
//   }
// };


// Refresh Token Controller
export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.cookies; // Or retrieve it from request body if not using cookies

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is missing" });
  }

  try {
    // Verify the refresh token
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Error refreshing token:", err);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};


// Logout Controller
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(400).json({ message: 'Refresh token is required.' });

    // Find the user with the refresh token and remove it
    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(400).json({ message: 'Invalid refresh token.' });

    user.refreshToken = null; // Clear the refresh token
    await user.save();

    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
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

// Update User Data Controller (PUT route)
export const updateUserData = async (req, res) => {
  try {
    const userId = req.user.id; // Access user ID from the token payload
    const { firstName, lastName, email } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update user data
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    await user.save(); // Save the updated user

    res.status(200).json({
      message: 'User data updated successfully.',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // or 587 for TLS
  secure: true, // Use SSL for secure connection
  auth: {
    user: process.env.EMAIL_USER, // Gmail email address
    pass: process.env.EMAIL_PASS, // App Password
  },
});

// Forgot password function
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Create a unique token for password reset
    const resetToken = randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour from now

    await user.save();

    // Send email with reset link
    const resetUrl = `http://localhost:5000/reset-password/${resetToken}`;

    await transporter.sendMail({
      to: user.email,
      from: 'noreply@yourapp.com',
      subject: 'Password Reset',
      text: `Click the link below to reset your password:\n\n${resetUrl}`,
    });

    res.status(200).json({ message: 'Password reset link sent to your email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Reset password function
export const resetPassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  // Validation check
  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    const userId = req.user.id;  // Getting user ID from the token

    // Find user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Save the user with the new password
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ message: 'Internal server error.' });
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
