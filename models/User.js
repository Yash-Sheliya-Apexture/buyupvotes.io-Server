// import mongoose from 'mongoose';

// // Create a user schema
// const userSchema = new mongoose.Schema(
//   {
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
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
//     refreshToken: { type: String },
//   },
//   { timestamps: true }
// );

// // Create a User model from the schema
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
  },
  { timestamps: true }
);


// Create a User model from the schema
const User = mongoose.model('User', userSchema);

export default User;
