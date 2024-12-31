// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// import nodemailer from 'nodemailer'; // You'll need to set up nodemailer to send emails
// import { randomBytes } from 'crypto';  // Import only randomBytes from crypto


// // Register Controller
// export const register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, confirmPassword } = req.body;

//     // Email Regex Validation
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/i;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ code: "INVALID_EMAIL", message: "Email must be from Gmail, Yahoo, or Outlook." });
//     }

//     // Password Validation
//     const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
//     if (!passwordRegex.test(password)) {
//       return res.status(400).json({ 
//         code: "WEAK_PASSWORD", 
//         message: "Password must be at least 8 characters, include one uppercase letter, and one special symbol." 
//       });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ code: "PASSWORD_MISMATCH", message: "Passwords do not match." });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ code: "EMAIL_EXISTS", message: "Email already exists." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ firstName, lastName, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ code: "SUCCESS", message: "User registered successfully." });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ code: "SERVER_ERROR", message: "An internal server error occurred." });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Please enter a valid email address.' });  // More specific error

//     // Verify password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Incorrect password.' });  // More specific error

//     // Generate tokens
//     const accessToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '12h' } // Access token expires in 12 hours
//     );

//     const refreshToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_REFRESH_SECRET,
//       { expiresIn: '7d' } // Refresh token expires in 7 days
//     );

//     // Store the refresh token in the database
//     user.refreshToken = refreshToken;
//     await user.save();

//     // Send tokens to the client
//     res.status(200).json({ accessToken, refreshToken });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error. Please try again later.' });  // More specific server error message
//   }
// };


// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// import nodemailer from 'nodemailer'; // You'll need to set up nodemailer to send emails
// import dotenv from 'dotenv';
// import { randomBytes } from 'crypto';  // Import only randomBytes from crypto
// import { randomInt } from 'crypto';

// // Load environment variables
// dotenv.config();


// export const register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, confirmPassword } = req.body;

//     // Normalize input
//     const normalizedEmail = email.trim().toLowerCase();

//     // Email Regex Validation
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/i;
//     if (!emailRegex.test(normalizedEmail)) {
//       return res.status(400).json({ code: "INVALID_EMAIL", message: "Email must be from Gmail, Yahoo, or Outlook." });
//     }

//     // Password Validation
//     const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
//     if (!passwordRegex.test(password)) {
//       return res.status(400).json({
//         code: "WEAK_PASSWORD",
//         message: "Password must be at least 8 characters, include one uppercase letter, and one special symbol."
//       });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ code: "PASSWORD_MISMATCH", message: "Passwords do not match." });
//     }

//     // Check if email exists
//     const existingUser = await User.findOne({ email: normalizedEmail });
//     if (existingUser) {
//       return res.status(400).json({ code: "EMAIL_EXISTS", message: "Email already exists." });
//     }

//     // Hash password and create user
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ firstName, lastName, email: normalizedEmail, password: hashedPassword });
//     await newUser.save();

//     // Success response
//     res.status(201).json({ code: "SUCCESS", message: "User registered successfully." });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ code: "SERVER_ERROR", message: "An internal server error occurred." });
//   }
// };


// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Normalize input
//     const normalizedEmail = email.trim().toLowerCase();

//     // Check if user exists
//     const user = await User.findOne({ email: normalizedEmail });
//     if (!user) {
//       return res.status(400).json({ code: "INVALID_EMAIL", message: "Invalid email or password." });
//     }

//     // Verify password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ code: "INVALID_PASSWORD", message: "Invalid email or password." });
//     }

//     // Generate tokens
//     const accessToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '12h' } // Access token expires in 12 hours
//     );

//     const refreshToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_REFRESH_SECRET,
//       { expiresIn: '7d' } // Refresh token expires in 7 days
//     );

//     // Store the refresh token in the database
//     user.refreshToken = refreshToken;
//     await user.save();

//     // Success response
//     res.status(200).json({
//       code: "SUCCESS",
//       message: "Login successful.",
//       tokens: { accessToken, refreshToken },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ code: "SERVER_ERROR", message: "An internal server error occurred." });
//   }
// };



// // Refresh Token Controller
// export const refreshAccessToken = async (req, res) => {
//   const { refreshToken } = req.body; // Retrieve it from request body if not using cookies

//   if (!refreshToken) {
//     return res.status(401).json({ message: "Refresh token is missing" });
//   }

//   try {
//     // Verify the refresh token
//     const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
//     const user = await User.findById(payload.id);

//     if (!user || user.refreshToken !== refreshToken) {
//       return res.status(403).json({ message: "Invalid refresh token" });
//     }

//     // Generate a new access token
//     const newAccessToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "12h" }
//     );

//     res.status(200).json({ accessToken: newAccessToken });
//   } catch (err) {
//     console.error("Error refreshing token:", err);
//     res.status(403).json({ message: "Invalid or expired refresh token" });
//   }
// };


// // Logout Controller
// export const logout = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;

//     if (!refreshToken) return res.status(400).json({ message: 'Refresh token is required.' });

//     // Find the user with the refresh token and remove it
//     const user = await User.findOne({ refreshToken });
//     if (!user) return res.status(400).json({ message: 'Invalid refresh token.' });

//     user.refreshToken = null; // Clear the refresh token
//     await user.save();

//     res.status(200).json({ message: 'Logged out successfully.' });
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

// // Update User Data Controller (PUT route)
// export const updateUserData = async (req, res) => {
//   try {
//     const userId = req.user.id; // Access user ID from the token payload
//     const { firstName, lastName, email } = req.body;

//     // Find the user by ID
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Update user data
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (email) user.email = email;

//     await user.save(); // Save the updated user

//     res.status(200).json({
//       message: 'User data updated successfully.',
//       user: {
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };





// // Create Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,  // smtp-relay.brevo.com for Brevo
//   port: process.env.SMTP_PORT,  // 587 for TLS/STARTTLS
//   secure: process.env.SMTP_PORT === '465',  // Use secure connection for port 465 (SSL)
//   auth: {
//     user: process.env.SMTP_USER,  // Your email address (Gmail or Brevo)
//     pass: process.env.SMTP_PASS,  // Your SMTP app password
//   },
// });

// // Forgot password function
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Generate a 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiration = Date.now() + 10 * 60 * 1000; // 10 minutes from now

//     // Save OTP and expiration to the user's record
//     try {
//       user.otp = otp;
//       user.otpExpiration = otpExpiration;
//       await user.save();
//     } catch (dbError) {
//       console.error('Error saving OTP to database:', dbError);
//       return res.status(500).json({ message: 'Database save error.' });
//     }

//     // Send OTP via email
//     try {
//       await transporter.sendMail({
//         to: user.email,
//         from: process.env.EMAIL_USER,  // From email address
//         subject: 'Password Reset OTP',
//         text: `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`,
//       });
//     } catch (emailError) {
//       console.error('Error sending email:', emailError);
//       return res.status(500).json({ message: 'Failed to send OTP email.' });
//     }

//     res.status(200).json({ message: 'OTP sent to your email.' });
//   } catch (err) {
//     console.error('Unexpected server error:', err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };

// // Resend OTP function (new API)
// export const resendResetOtp = async (req, res) => {
//   const { email } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Check if OTP exists and has expired
//     if (user.otp && user.otpExpiration > Date.now()) {
//       // OTP is still valid
//       return res.status(400).json({ message: 'OTP is still valid. Please check your email.' });
//     }

//     // Generate a new 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiration = Date.now() + 10 * 60 * 1000; // 10 minutes from now

//     // Save the new OTP and expiration time to the user's record
//     try {
//       user.otp = otp;
//       user.otpExpiration = otpExpiration;
//       await user.save();
//     } catch (dbError) {
//       console.error('Error saving OTP to database:', dbError);
//       return res.status(500).json({ message: 'Database save error.' });
//     }

//     // Send OTP via email
//     try {
//       await transporter.sendMail({
//         to: user.email,
//         from: process.env.EMAIL_USER,  // From email address
//         subject: 'Password Reset OTP',
//         text: `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`,
//       });
//     } catch (emailError) {
//       console.error('Error sending email:', emailError);
//       return res.status(500).json({ message: 'Failed to send OTP email.' });
//     }

//     // Respond with success message
//     res.status(200).json({ message: 'New OTP sent to your email.' });
//   } catch (err) {
//     console.error('Unexpected server error:', err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };


// // Reset password function
// export const verifyOtpAndResetPassword = async (req, res) => {
//   const { email, otp, newPassword, confirmPassword } = req.body;

//   // Check if all fields are provided
//   if (!email || !otp || !newPassword || !confirmPassword) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   // Password complexity regex
//   const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.{8,})/;

//   if (newPassword !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match.' });
//   }

//   if (!passwordRegex.test(newPassword)) {
//     return res.status(400).json({ message: 'Password must be at least 8 characters, include one uppercase letter, and one special symbol.' });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Check if the OTP matches and is not expired
//     if (user.otp !== otp || user.otpExpiration < Date.now()) {
//       return res.status(400).json({ message: 'Invalid Verification code' });
//     }

//     // Hash the new password and save it
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;

//     // Clear OTP and expiration fields
//     user.otp = undefined;
//     user.otpExpiration = undefined;
//     await user.save();

//     res.status(200).json({ message: 'Password reset successfully.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };







// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// import nodemailer from 'nodemailer'; // You'll need to set up nodemailer to send emails
// import dotenv from 'dotenv';
// import { randomBytes } from 'crypto';  // Import only randomBytes from crypto
// import { randomInt } from 'crypto';

// // Load environment variables
// dotenv.config();


// export const register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, confirmPassword } = req.body;

//     // Normalize input
//     const normalizedEmail = email.trim().toLowerCase();

//     // Email Regex Validation
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/i;
//     if (!emailRegex.test(normalizedEmail)) {
//       return res.status(400).json({ code: "INVALID_EMAIL", message: "Email must be from Gmail, Yahoo, or Outlook." });
//     }

//     // Password Validation
//     const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
//     if (!passwordRegex.test(password)) {
//       return res.status(400).json({
//         code: "WEAK_PASSWORD",
//         message: "Password must be at least 8 characters, include one uppercase letter, and one special symbol."
//       });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ code: "PASSWORD_MISMATCH", message: "Passwords do not match." });
//     }

//     // Check if email exists
//     const existingUser = await User.findOne({ email: normalizedEmail });
//     if (existingUser) {
//       return res.status(400).json({ code: "EMAIL_EXISTS", message: "Email already exists." });
//     }

//     // Hash password and create user
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ firstName, lastName, email: normalizedEmail, password: hashedPassword });
//     await newUser.save();

//     // Success response
//     res.status(201).json({ code: "SUCCESS", message: "User registered successfully." });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ code: "SERVER_ERROR", message: "An internal server error occurred." });
//   }
// };


// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Normalize input
//     const normalizedEmail = email.trim().toLowerCase();

//     // Check if user exists
//     const user = await User.findOne({ email: normalizedEmail });
//     if (!user) {
//       return res.status(400).json({ code: "INVALID_EMAIL", message: "Invalid email or password." });
//     }

//     // Verify password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ code: "INVALID_PASSWORD", message: "Invalid email or password." });
//     }

//     // Generate tokens
//     const accessToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '12h' } // Access token expires in 12 hours
//     );

//     const refreshToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_REFRESH_SECRET,
//       { expiresIn: '7d' } // Refresh token expires in 7 days
//     );

//     // Store the refresh token in the database
//     user.refreshToken = refreshToken;
//     await user.save();

//     // Success response
//     res.status(200).json({
//       code: "SUCCESS",
//       message: "Login successful.",
//       tokens: { accessToken, refreshToken },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ code: "SERVER_ERROR", message: "An internal server error occurred." });
//   }
// };



// // Refresh Token Controller
// export const refreshAccessToken = async (req, res) => {
//   const { refreshToken } = req.cookies; // Or retrieve it from request body if not using cookies

//   if (!refreshToken) {
//     return res.status(401).json({ message: "Refresh token is missing" });
//   }

//   try {
//     // Verify the refresh token
//     const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
//     const user = await User.findById(payload.id);

//     if (!user || user.refreshToken !== refreshToken) {
//       return res.status(403).json({ message: "Invalid refresh token" });
//     }

//     // Generate a new access token
//     const newAccessToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "12h" }
//     );

//     res.status(200).json({ accessToken: newAccessToken });
//   } catch (err) {
//     console.error("Error refreshing token:", err);
//     res.status(403).json({ message: "Invalid or expired refresh token" });
//   }
// };


// // Logout Controller
// export const logout = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;

//     if (!refreshToken) return res.status(400).json({ message: 'Refresh token is required.' });

//     // Find the user with the refresh token and remove it
//     const user = await User.findOne({ refreshToken });
//     if (!user) return res.status(400).json({ message: 'Invalid refresh token.' });

//     user.refreshToken = null; // Clear the refresh token
//     await user.save();

//     res.status(200).json({ message: 'Logged out successfully.' });
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

// // Update User Data Controller (PUT route)
// export const updateUserData = async (req, res) => {
//   try {
//     const userId = req.user.id; // Access user ID from the token payload
//     const { firstName, lastName, email } = req.body;

//     // Find the user by ID
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Update user data
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (email) user.email = email;

//     await user.save(); // Save the updated user

//     res.status(200).json({
//       message: 'User data updated successfully.',
//       user: {
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };





// // Create Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,  // smtp-relay.brevo.com for Brevo
//   port: process.env.SMTP_PORT,  // 587 for TLS/STARTTLS
//   secure: process.env.SMTP_PORT === '465',  // Use secure connection for port 465 (SSL)
//   auth: {
//     user: process.env.SMTP_USER,  // Your email address (Gmail or Brevo)
//     pass: process.env.SMTP_PASS,  // Your SMTP app password
//   },
// });

// // Forgot password function
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Generate a 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiration = Date.now() + 10 * 60 * 1000; // 10 minutes from now

//     // Save OTP and expiration to the user's record
//     try {
//       user.otp = otp;
//       user.otpExpiration = otpExpiration;
//       await user.save();
//     } catch (dbError) {
//       console.error('Error saving OTP to database:', dbError);
//       return res.status(500).json({ message: 'Database save error.' });
//     }

//     // Send OTP via email
//     try {
//       await transporter.sendMail({
//         to: user.email,
//         from: process.env.EMAIL_USER,  // From email address
//         subject: 'Password Reset OTP',
//         text: `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`,
//       });
//     } catch (emailError) {
//       console.error('Error sending email:', emailError);
//       return res.status(500).json({ message: 'Failed to send OTP email.' });
//     }

//     res.status(200).json({ message: 'OTP sent to your email.' });
//   } catch (err) {
//     console.error('Unexpected server error:', err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };

// // Resend OTP function (new API)
// export const resendResetOtp = async (req, res) => {
//   const { email } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Check if OTP exists and has expired
//     if (user.otp && user.otpExpiration > Date.now()) {
//       // OTP is still valid
//       return res.status(400).json({ message: 'OTP is still valid. Please check your email.' });
//     }

//     // Generate a new 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiration = Date.now() + 10 * 60 * 1000; // 10 minutes from now

//     // Save the new OTP and expiration time to the user's record
//     try {
//       user.otp = otp;
//       user.otpExpiration = otpExpiration;
//       await user.save();
//     } catch (dbError) {
//       console.error('Error saving OTP to database:', dbError);
//       return res.status(500).json({ message: 'Database save error.' });
//     }

//     // Send OTP via email
//     try {
//       await transporter.sendMail({
//         to: user.email,
//         from: process.env.EMAIL_USER,  // From email address
//         subject: 'Password Reset OTP',
//         text: `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`,
//       });
//     } catch (emailError) {
//       console.error('Error sending email:', emailError);
//       return res.status(500).json({ message: 'Failed to send OTP email.' });
//     }

//     // Respond with success message
//     res.status(200).json({ message: 'New OTP sent to your email.' });
//   } catch (err) {
//     console.error('Unexpected server error:', err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };


// // Reset password function
// export const verifyOtpAndResetPassword = async (req, res) => {
//   const { email, otp, newPassword, confirmPassword } = req.body;

//   // Check if all fields are provided
//   if (!email || !otp || !newPassword || !confirmPassword) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   // Password complexity regex
//   const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.{8,})/;

//   if (newPassword !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match.' });
//   }

//   if (!passwordRegex.test(newPassword)) {
//     return res.status(400).json({ message: 'Password must be at least 8 characters, include one uppercase letter, and one special symbol.' });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Check if the OTP matches and is not expired
//     if (user.otp !== otp || user.otpExpiration < Date.now()) {
//       return res.status(400).json({ message: 'Invalid Verification code' });
//     }

//     // Hash the new password and save it
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;

//     // Clear OTP and expiration fields
//     user.otp = undefined;
//     user.otpExpiration = undefined;
//     await user.save();

//     res.status(200).json({ message: 'Password reset successfully.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };



import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from 'nodemailer'; // You'll need to set up nodemailer to send emails
import dotenv from 'dotenv';
import { randomBytes } from 'crypto';  // Import only randomBytes from crypto
import { randomInt } from 'crypto';

// Load environment variables
dotenv.config();


export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Normalize input
    const normalizedEmail = email.trim().toLowerCase();

    // Email Regex Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/i;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ code: "INVALID_EMAIL", message: "Email must be from Gmail, Yahoo, or Outlook." });
    }

    // Password Validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        code: "WEAK_PASSWORD",
        message: "Password must be at least 8 characters, include one uppercase letter, and one special symbol."
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ code: "PASSWORD_MISMATCH", message: "Passwords do not match." });
    }

    // Check if email exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ code: "EMAIL_EXISTS", message: "Email already exists." });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email: normalizedEmail, password: hashedPassword });
    await newUser.save();

    // Success response
    res.status(201).json({ code: "SUCCESS", message: "User registered successfully." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ code: "SERVER_ERROR", message: "An internal server error occurred." });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Normalize input
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user exists
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ code: "INVALID_EMAIL", message: "Invalid email or password." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ code: "INVALID_PASSWORD", message: "Invalid email or password." });
    }

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

    // Success response
    res.status(200).json({
      code: "SUCCESS",
      message: "Login successful.",
      tokens: { accessToken, refreshToken },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: "SERVER_ERROR", message: "An internal server error occurred." });
  }
};



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
  host: process.env.SMTP_HOST,  // smtp-relay.brevo.com for Brevo
  port: process.env.SMTP_PORT,  // 587 for TLS/STARTTLS
  secure: process.env.SMTP_PORT === '465',  // Use secure connection for port 465 (SSL)
  auth: {
    user: process.env.SMTP_USER,  // Your email address (Gmail or Brevo)
    pass: process.env.SMTP_PASS,  // Your SMTP app password
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

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    // Save OTP and expiration to the user's record
    try {
      user.otp = otp;
      user.otpExpiration = otpExpiration;
      await user.save();
    } catch (dbError) {
      console.error('Error saving OTP to database:', dbError);
      return res.status(500).json({ message: 'Database save error.' });
    }

    // Send OTP via email
    try {
      await transporter.sendMail({
        to: user.email,
        from: process.env.EMAIL_USER,  // From email address
        subject: 'Password Reset OTP',
        text: `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return res.status(500).json({ message: 'Failed to send OTP email.' });
    }

    res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (err) {
    console.error('Unexpected server error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Resend OTP function (new API)
export const resendResetOtp = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if OTP exists and has expired
    if (user.otp && user.otpExpiration > Date.now()) {
      // OTP is still valid
      return res.status(400).json({ message: 'OTP is still valid. Please check your email.' });
    }

    // Generate a new 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    // Save the new OTP and expiration time to the user's record
    try {
      user.otp = otp;
      user.otpExpiration = otpExpiration;
      await user.save();
    } catch (dbError) {
      console.error('Error saving OTP to database:', dbError);
      return res.status(500).json({ message: 'Database save error.' });
    }

    // Send OTP via email
    try {
      await transporter.sendMail({
        to: user.email,
        from: process.env.EMAIL_USER,  // From email address
        subject: 'Password Reset OTP',
        text: `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return res.status(500).json({ message: 'Failed to send OTP email.' });
    }

    // Respond with success message
    res.status(200).json({ message: 'New OTP sent to your email.' });
  } catch (err) {
    console.error('Unexpected server error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};


// Reset password function
export const verifyOtpAndResetPassword = async (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;

  // Check if all fields are provided
  if (!email || !otp || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Password complexity regex
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.{8,})/;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters, include one uppercase letter, and one special symbol.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the OTP matches and is not expired
    if (user.otp !== otp || user.otpExpiration < Date.now()) {
      return res.status(400).json({ message: 'Invalid Verification code' });
    }

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear OTP and expiration fields
    user.otp = undefined;
    user.otpExpiration = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};


// New API for resetting password using old password
export const resetPassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user.id;

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }


      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid old password.' });
    }

      if (newPassword !== confirmPassword) {
          return res.status(400).json({ message: 'Passwords do not match.' });
      }

      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.{8,})/;

      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters, include one uppercase letter, and one special symbol.' });
      }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;


    await user.save();
    res.status(200).json({ message: 'Password updated successfully.' });
} catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
