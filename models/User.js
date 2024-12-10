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


import mongoose from 'mongoose';

// Create a user schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

export default User;
