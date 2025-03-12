// import mongoose from 'mongoose';

// // Create a user schema
// const userSchema = new mongoose.Schema(
//   {
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     refreshToken: { type: String }, // For refresh tokens in authentication
//     otp: { type: String }, // For storing OTP
//     otpExpiration: { type: Date }, // OTP expiration time
//     resetToken: { type: String }, // For password reset token
//     resetTokenExpiration: { type: Date }, // Token expiration time
//   },
//   { timestamps: true }
// );


// // Create a User model from the schema
// const User = mongoose.model('User', userSchema);

// export default User;



// import mongoose from 'mongoose';

// // Create a user schema
// const userSchema = new mongoose.Schema(
//   {
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     refreshToken: { type: String }, // For refresh tokens in authentication
//     otp: { type: String }, // For storing OTP
//     otpExpiration: { type: Date }, // OTP expiration time
//     resetToken: { type: String }, // For password reset token
//     resetTokenExpiration: { type: Date }, // Token expiration time
//     role: {
//       type: String,
//       enum: ['user', 'admin'],  // Only allow 'user' or 'admin'
//       default: 'user',            // Default role is 'user'
//     },
//   },
//   { timestamps: true }
// );

// // Create a User model from the schema
// const User = mongoose.model('User', userSchema);

// export default User;


// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema(
//   {
//     firstName: { type: String, required: [true, 'First name is required'] },
//     lastName: { type: String, required: [true, 'Last name is required'] },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//       lowercase: true, // Store email in lowercase
//       trim: true,      // Remove whitespace
//       match: [
//         /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//         'Please enter a valid email address',
//       ], // Validate email format
//     },
//     password: {
//       type: String,
//       required: [true, 'Password is required'],
//       minlength: [8, 'Password must be at least 8 characters long'],
//     },
//     refreshToken: { type: String },
//     otp: { type: String },
//     otpExpiration: { type: Date },
//     resetToken: { type: String },
//     resetTokenExpiration: { type: Date },
//     role: {
//       type: String,
//       enum: ['user', 'admin'],
//       default: 'user',
//     },
//     totalAmount: {
//       type: Number,
//       default: 0,
//     }, // Add the totalAmount field
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// // Hash the password before saving to the database
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next(); // Only hash if password was actually modified
//   }

//   try {
//     const salt = await bcrypt.genSalt(10); // Generate salt
//     this.password = await bcrypt.hash(this.password, salt); // Hash password
//     next();
//   } catch (error) {
//     next(error); // Pass error to the next middleware
//   }
// });

// // Method to compare password with hashed password
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model('User', userSchema);

// export default User;


// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema(
//   {
//     firstName: { type: String, required: [true, 'First name is required'] },
//     lastName: { type: String, required: [true, 'Last name is required'] },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//       lowercase: true, // Store email in lowercase
//       trim: true,      // Remove whitespace
//       match: [
//         /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//         'Please enter a valid email address',
//       ], // Validate email format
//     },
//     password: {
//       type: String,
//       required: [true, 'Password is required'],
//       minlength: [8, 'Password must be at least 8 characters long'],
//     },
//     refreshToken: { type: String },
//     otp: { type: String },
//     otpExpiration: { type: Date },
//     resetToken: { type: String },
//     resetTokenExpiration: { type: Date },
//     role: {
//       type: String,
//       enum: ['user', 'admin'],
//       default: 'user',
//     },
//     totalAmount: {
//       type: Number,
//       default: 0,
//     }, // Add the totalAmount field
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// // Hash the password before saving to the database
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next(); // Only hash if password was actually modified
//   }

//   try {
//     const salt = await bcrypt.genSalt(10); // Generate salt
//     this.password = await bcrypt.hash(this.password, salt); // Hash password
//     next();
//   } catch (error) {
//     next(error); // Pass error to the next middleware
//   }
// });

// // Method to compare password with hashed password
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model('User', userSchema);

// export default User;


// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema(
//   {
//     firstName: { type: String, required: [true, 'First name is required'] },
//     lastName: { type: String, required: [true, 'Last name is required'] },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//       lowercase: true, // Store email in lowercase
//       trim: true,      // Remove whitespace
//       match: [
//         /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//         'Please enter a valid email address',
//       ], // Validate email format
//     },
//     password: {
//       type: String,
//       required: [true, 'Password is required'],
//       minlength: [8, 'Password must be at least 8 characters long'],
//     },
//     refreshToken: { type: String },
//     otp: { type: String },
//     otpExpiration: { type: Date },
//     resetToken: { type: String },
//     resetTokenExpiration: { type: Date },
//     role: {
//       type: String,
//       enum: ['user', 'admin'],
//       default: 'user',
//     },
//     totalAmount: {
//       type: Number,
//       default: 0,
//     }, // Add the totalAmount field
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// // Hash the password before saving to the database
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next(); // Only hash if password was actually modified
//   }

//   try {
//     const salt = await bcrypt.genSalt(10); // Generate salt
//     this.password = await bcrypt.hash(this.password, salt); // Hash password
//     next();
//   } catch (error) {
//     next(error); // Pass error to the next middleware
//   }
// });

// // Method to compare password with hashed password (Correct as is)
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model('User', userSchema);

// export default User;




import mongoose from 'mongoose';

// Create a user schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String }, // For refresh tokens in authentication
    otp: { type: String }, // For storing OTP
    otpExpiration: { type: Date }, // OTP expiration time
    resetToken: { type: String }, // For password reset token
    resetTokenExpiration: { type: Date }, // Token expiration time
    role: {
      type: String,
      enum: ['user', 'admin'],  // Only allow 'user' or 'admin'
      default: 'user',            // Default role is 'user'
    },
  },
  { timestamps: true }
);

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

export default User;
