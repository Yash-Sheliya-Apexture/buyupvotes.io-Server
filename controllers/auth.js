// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// import nodemailer from 'nodemailer'; // You'll need to set up nodemailer to send emails
// import dotenv from 'dotenv';

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

//     // Set cookie before sending JSON response
//     res.cookie('refreshToken', refreshToken, {
//         httpOnly: true, // Make it inaccessible to client-side JavaScript
//         secure: true, // Use only in HTTPS environments
//         sameSite: 'None',// Important for cross-domain requests
//         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
//     });

//     res.status(200).json({
//       code: "SUCCESS",
//       message: "Login successful.",
//       tokens: { accessToken },
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ code: "SERVER_ERROR", message: "An internal server error occurred." });
//   }
// };

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


// // New API for resetting password using old password
// export const resetPassword = async (req, res) => {
//   const { oldPassword, newPassword, confirmPassword } = req.body;
//   const userId = req.user.id;

//   try {
//       const user = await User.findById(userId);
//       if (!user) {
//           return res.status(404).json({ message: 'User not found.' });
//       }


//       const isMatch = await bcrypt.compare(oldPassword, user.password);

//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid old password.' });
//     }

//       if (newPassword !== confirmPassword) {
//           return res.status(400).json({ message: 'Passwords do not match.' });
//       }

//       const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.{8,})/;

//       if (!passwordRegex.test(newPassword)) {
//         return res.status(400).json({ message: 'Password must be at least 8 characters, include one uppercase letter, and one special symbol.' });
//       }
//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;


//     await user.save();
//     res.status(200).json({ message: 'Password updated successfully.' });
// } catch (error) {
//     console.error('Error resetting password:', error);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };





// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// import nodemailer from 'nodemailer'; // You'll need to set up nodemailer to send emails
// import dotenv from 'dotenv';

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

//     // Set cookie before sending JSON response
//     res.cookie('refreshToken', refreshToken, {
//         httpOnly: true, // Make it inaccessible to client-side JavaScript
//         secure: true, // Use only in HTTPS environments
//         sameSite: 'None',// Important for cross-domain requests
//         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
//     });

//     res.status(200).json({
//       code: "SUCCESS",
//       message: "Login successful.",
//       tokens: { accessToken },
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ code: "SERVER_ERROR", message: "An internal server error occurred." });
//   }
// };

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
//       const userId = req.user._id; // Access user ID from the token payload
//     const user = await User.findById(userId).select('-password').lean(); // Exclude the password field

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
//     const userId = req.user._id; // Access user ID from the token payload
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


// // New API for resetting password using old password
// export const resetPassword = async (req, res) => {
//   const { oldPassword, newPassword, confirmPassword } = req.body;
//   const userId = req.user._id;

//   try {
//       const user = await User.findById(userId);
//       if (!user) {
//           return res.status(404).json({ message: 'User not found.' });
//       }


//       const isMatch = await bcrypt.compare(oldPassword, user.password);

//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid old password.' });
//     }

//       if (newPassword !== confirmPassword) {
//           return res.status(400).json({ message: 'Passwords do not match.' });
//       }

//       const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.{8,})/;

//       if (!passwordRegex.test(newPassword)) {
//         return res.status(400).json({ message: 'Password must be at least 8 characters, include one uppercase letter, and one special symbol.' });
//       }
//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;


//     await user.save();
//     res.status(200).json({ message: 'Password updated successfully.' });
// } catch (error) {
//     console.error('Error resetting password:', error);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };







// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// // Create Nodemailer transporter (moved to top level for re-use)
// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: process.env.SMTP_PORT === '465',
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//     },
//     tls: {  // Add this to bypass certificate issues in some environments
//         rejectUnauthorized: false,
//     }
// });

// // Register
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

// // Login
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
//       { id: user._id, role: user.role },  // Include the role in the payload
//       process.env.JWT_SECRET,
//       { expiresIn: '12h' }
//     );

//     const refreshToken = jwt.sign(
//       { id: user._id, role: user.role },  // Include the role in the payload
//       process.env.JWT_REFRESH_SECRET,
//       { expiresIn: '7d' }
//     );

//     // Store the refresh token in the database
//     user.refreshToken = refreshToken;
//     await user.save();

//     // Set cookie before sending JSON response
//     res.cookie('refreshToken', refreshToken, {
//         httpOnly: true,
//         secure: true,
//         sameSite: 'None',
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       code: "SUCCESS",
//       message: "Login successful.",
//       tokens: { accessToken },
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ code: "SERVER_ERROR", message: "An internal server error occurred." });
//   }
// };

// // Refresh Access Token
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
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "12h" }
//     );

//     res.status(200).json({ accessToken: newAccessToken });
//   } catch (err) {
//     console.error("Error refreshing token:", err);
//     res.status(403).json({ message: "Invalid or expired refresh token" });
//   }
// };

// // Logout
// export const logout = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;

//     if (!refreshToken) return res.status(400).json({ message: 'Refresh token is required.' });

//     const user = await User.findOne({ refreshToken });
//     if (!user) return res.status(400).json({ message: 'Invalid refresh token.' });

//     user.refreshToken = null;
//     await user.save();

//     res.status(200).json({ message: 'Logged out successfully.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };


// // Get User Data
// export const getUserData = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const user = await User.findById(userId).select('-password').lean();

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     res.status(200).json({
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       role: user.role,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };

// // Update User Data
// export const updateUserData = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { firstName, lastName, email } = req.body;

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (email) user.email = email;

//     await user.save();

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

// // Forgot password
// export const forgotPassword = async (req, res) => {
//     try {
//         const { email } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         const otpExpiration = Date.now() + 10 * 60 * 1000;

//         user.otp = otp;
//         user.otpExpiration = otpExpiration;
//         await user.save();

//         // Send OTP via email
//         try {
//             const mailOptions = {
//                 to: user.email,
//                 from: process.env.EMAIL_USER, // Use your verified email address
//                 subject: 'Password Reset OTP',
//                 text: `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`,
//             };

//             const info = await transporter.sendMail(mailOptions);
//             console.log("Message sent: %s", info.messageId);

//             res.status(200).json({ message: 'OTP sent to your email.' });

//         } catch (emailError) {
//             console.error('Error sending email:', emailError);
//             return res.status(500).json({ message: 'Failed to send OTP email.', error: emailError.message });  // Include error message
//         }

//     } catch (err) {
//         console.error('Unexpected server error:', err);
//         res.status(500).json({ message: 'Server error.', error: err.message });  // Include error message
//     }
// };


// // Resend OTP
// export const resendResetOtp = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     if (user.otp && user.otpExpiration > Date.now()) {
//       return res.status(400).json({ message: 'OTP is still valid. Please check your email.' });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiration = Date.now() + 10 * 60 * 1000;

//     user.otp = otp;
//     user.otpExpiration = otpExpiration;
//     await user.save();

//     try {
//       const mailOptions = {
//         to: user.email,
//         from: process.env.EMAIL_USER,
//         subject: 'Password Reset OTP',
//         text: `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`,
//       };

//       const info = await transporter.sendMail(mailOptions);
//       console.log("Message sent: %s", info.messageId);

//       res.status(200).json({ message: 'New OTP sent to your email.' });
//     } catch (emailError) {
//       console.error('Error sending email:', emailError);
//       return res.status(500).json({ message: 'Failed to send OTP email.', error: emailError.message });
//     }
//   } catch (err) {
//     console.error('Unexpected server error:', err);
//     res.status(500).json({ message: 'Server error.', error: err.message });
//   }
// };


// // Verify OTP and Reset Password
// export const verifyOtpAndResetPassword = async (req, res) => {
//     const { email, otp, newPassword, confirmPassword } = req.body;

//     if (!email || !otp || !newPassword || !confirmPassword) {
//         return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.{8,})/;

//     if (newPassword !== confirmPassword) {
//         return res.status(400).json({ message: 'Passwords do not match.' });
//     }

//     if (!passwordRegex.test(newPassword)) {
//         return res.status(400).json({ message: 'Password must be at least 8 characters, include one uppercase letter, and one special symbol.' });
//     }

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         if (user.otp !== otp || user.otpExpiration < Date.now()) {
//             return res.status(400).json({ message: 'Invalid Verification code' });
//         }

//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;

//         user.otp = undefined;
//         user.otpExpiration = undefined;
//         await user.save();

//         res.status(200).json({ message: 'Password reset successfully.' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error.' });
//     }
// };


// // Reset Password
// export const resetPassword = async (req, res) => {
//     const { oldPassword, newPassword, confirmPassword } = req.body;
//     const userId = req.user._id;

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         const isMatch = await bcrypt.compare(oldPassword, user.password);

//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid old password.' });
//         }

//         if (newPassword !== confirmPassword) {
//             return res.status(400).json({ message: 'Passwords do not match.' });
//         }

//         const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.{8,})/;

//         if (!passwordRegex.test(newPassword)) {
//             return res.status(400).json({ message: 'Password must be at least 8 characters, include one uppercase letter, and one special symbol.' });
//         }

//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;

//         await user.save();
//         res.status(200).json({ message: 'Password updated successfully.' });
//     } catch (error) {
//         console.error('Error resetting password:', error);
//         res.status(500).json({ message: 'Server error.' });
//     }
// };






// // controllers/auth.js (Modified)
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const generateAccessToken = (user) => {
//     return jwt.sign(
//         { id: user._id, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: '12h' }
//     );
// };

// const generateRefreshToken = (user) => {
//     return jwt.sign(
//         { id: user._id, role: user.role },
//         process.env.JWT_REFRESH_SECRET,
//         { expiresIn: '7d' }
//     );
// };

// // Create Nodemailer transporter (moved to top level for re-use)
// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: process.env.SMTP_PORT === '465',
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//     },
//     tls: {  // Add this to bypass certificate issues in some environments
//         rejectUnauthorized: false,
//     }
// });

// console.log("SMTP_PASS: (length):", process.env.SMTP_PASS ? process.env.SMTP_PASS.length : "undefined"); // Check if it's being read
// // Register
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

// // Login
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
//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);

//     // Store the refresh token in the database
//     user.refreshToken = refreshToken;
//     await user.save();

//     // Set cookie before sending JSON response
//     res.cookie('refreshToken', refreshToken, {
//         httpOnly: true,
//         secure: true,
//         sameSite: 'None',
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       code: "SUCCESS",
//       message: "Login successful.",
//       tokens: { accessToken },
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ code: "SERVER_ERROR", message: "An internal server error occurred." });
//   }
// };

// // Refresh Access Token
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
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "12h" }
//     );

//     res.status(200).json({ accessToken: newAccessToken });
//   } catch (err) {
//     console.error("Error refreshing token:", err);
//     res.status(403).json({ message: "Invalid or expired refresh token" });
//   }
// };

// // Logout
// export const logout = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;

//     if (!refreshToken) return res.status(400).json({ message: 'Refresh token is required.' });

//     const user = await User.findOne({ refreshToken });
//     if (!user) return res.status(400).json({ message: 'Invalid refresh token.' });

//     user.refreshToken = null;
//     await user.save();

//     res.status(200).json({ message: 'Logged out successfully.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };


// // Get User Data
// export const getUserData = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const user = await User.findById(userId).select('-password').lean();

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     res.status(200).json({
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       role: user.role,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };

// // Update User Data
// export const updateUserData = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { firstName, lastName, email } = req.body;

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (email) user.email = email;

//     await user.save();

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

// // Forgot password
// // export const forgotPassword = async (req, res) => {
// //     try {
// //         const { email } = req.body;

// //         const user = await User.findOne({ email });
// //         if (!user) {
// //             return res.status(404).json({ message: 'User not found.' });
// //         }

// //         const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //         const otpExpiration = Date.now() + 10 * 60 * 1000;

// //         user.otp = otp;
// //         user.otpExpiration = otpExpiration;
// //         await user.save();

// //         // Send OTP via email
// //         try {
// //             const mailOptions = {
// //                 to: user.email,
// //                 from: process.env.EMAIL_USER, // Use your verified email address
// //                 subject: 'Password Reset OTP',
// //                 text: `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`,
// //             };

// //             const info = await transporter.sendMail(mailOptions);
// //             console.log("Message sent: %s", info.messageId);

// //             res.status(200).json({ message: 'OTP sent to your email.' });

// //         } catch (emailError) {
// //             console.error('Error sending email:', emailError);
// //             return res.status(500).json({ message: 'Failed to send OTP email.', error: emailError.message });  // Include error message
// //         }

// //     } catch (err) {
// //         console.error('Unexpected server error:', err);
// //         res.status(500).json({ message: 'Server error.', error: err.message });  // Include error message
// //     }
// // };
// // Forgot password
// export const forgotPassword = async (req, res) => {
//     try {
//         const { email } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         const otpExpiration = Date.now() + 10 * 60 * 1000;

//         user.otp = otp;
//         user.otpExpiration = otpExpiration;
//         await user.save();

//         // Send OTP via email
//         try {
//             const mailOptions = {
//                 to: user.email,
//                 from: process.env.EMAIL_USER, // Use your verified email address
//                 subject: 'Password Reset OTP',
//                 text: `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`,
//             };

//             const info = await transporter.sendMail(mailOptions);
//             console.log("Message sent: %s", info.messageId);

//             res.status(200).json({ message: 'OTP sent to your email.' });

//         } catch (emailError) {
//             console.error('Error sending email:', emailError);
//             return res.status(500).json({ message: 'Failed to send OTP email.', error: emailError.message });  // Include error message
//         }

//     } catch (err) {
//         console.error('Unexpected server error:', err);
//         res.status(500).json({ message: 'Server error.', error: err.message });  // Include error message
//     }
// };


// // Resend OTP
// // export const resendResetOtp = async (req, res) => {
// //   const { email } = req.body;

// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found.' });
// //     }

// //     if (user.otp && user.otpExpiration > Date.now()) {
// //       return res.status(400).json({ message: 'OTP is still valid. Please check your email.' });
// //     }

// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //     const otpExpiration = Date.now() + 10 * 60 * 1000;

// //     user.otp = otp;
// //     user.otpExpiration = otpExpiration;
// //     await user.save();

// //     try {
// //       const mailOptions = {
// //         to: user.email,
// //         from: process.env.EMAIL_USER,
// //         subject: 'Password Reset OTP',
// //         text: `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`,
// //       };

// //       const info = await transporter.sendMail(mailOptions);
// //       console.log("Message sent: %s", info.messageId);

// //       res.status(200).json({ message: 'New OTP sent to your email.' });
// //     } catch (emailError) {
// //       console.error('Error sending email:', emailError);
// //       return res.status(500).json({ message: 'Failed to send OTP email.', error: emailError.message });
// //     }
// //   } catch (err) {
// //     console.error('Unexpected server error:', err);
// //     res.status(500).json({ message: 'Server error.', error: err.message });
// //   }
// // };
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



// // Verify OTP and Reset Password
// export const verifyOtpAndResetPassword = async (req, res) => {
//     const { email, otp, newPassword, confirmPassword } = req.body;

//     if (!email || !otp || !newPassword || !confirmPassword) {
//         return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.{8,})/;

//     if (newPassword !== confirmPassword) {
//         return res.status(400).json({ message: 'Passwords do not match.' });
//     }

//     if (!passwordRegex.test(newPassword)) {
//         return res.status(400).json({ message: 'Password must be at least 8 characters, include one uppercase letter, and one special symbol.' });
//     }

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         if (user.otp !== otp || user.otpExpiration < Date.now()) {
//             return res.status(400).json({ message: 'Invalid Verification code' });
//         }

//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;

//         user.otp = undefined;
//         user.otpExpiration = undefined;
//         await user.save();

//         res.status(200).json({ message: 'Password reset successfully.' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error.' });
//     }
// };


// // Reset Password
// export const resetPassword = async (req, res) => {
//     const { oldPassword, newPassword, confirmPassword } = req.body;
//     const userId = req.user._id;

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         const isMatch = await bcrypt.compare(oldPassword, user.password);

//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid old password.' });
//         }

//         if (newPassword !== confirmPassword) {
//             return res.status(400).json({ message: 'Passwords do not match.' });
//         }

//         const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.{8,})/;

//         if (!passwordRegex.test(newPassword)) {
//             return res.status(400).json({ message: 'Password must be at least 8 characters, include one uppercase letter, and one special symbol.' });
//         }

//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;

//         await user.save();
//         res.status(200).json({ message: 'Password updated successfully.' });
//     } catch (error) {
//         console.error('Error resetting password:', error);
//         res.status(500).json({ message: 'Server error.' });
//     }
// };




// backend/controllers/auth.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '12h' }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};

// Create Nodemailer transporter (moved to top level for re-use)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {  // Add this to bypass certificate issues in some environments
        rejectUnauthorized: false,
    }
});

console.log("SMTP_PASS: (length):", process.env.SMTP_PASS ? process.env.SMTP_PASS.length : "undefined"); // Check if it's being read
// Register
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

// Login
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
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store the refresh token in the database
        user.refreshToken = refreshToken;
        await user.save();

        // Set cookie before sending JSON response
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            code: "SUCCESS",
            message: "Login successful.",
            tokens: { accessToken },
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ code: "SERVER_ERROR", message: "An internal server error occurred." });
    }
};

// Refresh Access Token
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
        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );

        const newRefreshToken = generateRefreshToken(user);
        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ accessToken });
    } catch (err) {
        console.error("Error refreshing token:", err);
        res.status(403).json({ message: "Invalid or expired refresh token" });
    }
};

// Logout
export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) return res.status(400).json({ message: 'Refresh token is required.' });

        const user = await User.findOne({ refreshToken });
        if (!user) return res.status(400).json({ message: 'Invalid refresh token.' });

        user.refreshToken = null;
        await user.save();
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'None' });

        res.status(200).json({ message: 'Logged out successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};


// Get User Data
export const getUserData = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select('-password').lean();

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Update User Data
export const updateUserData = async (req, res) => {
    try {
        const userId = req.user._id;
        const { firstName, lastName, email } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;

        await user.save();

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

// Forgot password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiration = Date.now() + 10 * 60 * 1000;

        user.otp = otp;
        user.otpExpiration = otpExpiration;
        await user.save();

        // Send OTP via email
        try {
            const mailOptions = {
                to: user.email,
                from: process.env.EMAIL_USER, // Use your verified email address
                subject: 'Password Reset OTP',
                text: `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log("Message sent: %s", info.messageId);

            res.status(200).json({ message: 'OTP sent to your email.' });

        } catch (emailError) {
            console.error('Error sending email:', emailError);
            return res.status(500).json({ message: 'Failed to send OTP email.', error: emailError.message });  // Include error message
        }

    } catch (err) {
        console.error('Unexpected server error:', err);
        res.status(500).json({ message: 'Server error.', error: err.message });  // Include error message
    }
};


// Resend OTP
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



// Verify OTP and Reset Password
export const verifyOtpAndResetPassword = async (req, res) => {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

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

        if (user.otp !== otp || user.otpExpiration < Date.now()) {
            return res.status(400).json({ message: 'Invalid Verification code' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        user.otp = undefined;
        user.otpExpiration = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};


// Reset Password
export const resetPassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user._id;

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

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();
        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};