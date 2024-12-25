import mongoose from 'mongoose';

// Define the schema for orders
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,  // Ensure each order has a unique ID
  },
  userId: {
    type: String,
    required: true,  // Each order must be associated with a user
  },
  service: {
    type: String,
    required: true,  // The service associated with the order
  },
  speed: {
    type: String,
    required: true,  // The speed associated with the order
  },
  link: {
    type: String,
    required: true,  // The link associated with the order
  },
  quantity: {
    type: Number,
    required: true,  // The quantity of items for the order
    min: 5,
    max: 1000,
  },
  started: {
    type: String,
    required: true,  // The status of the order's start
  },
  status: {
    type: String,
    required: true,  // The status of the order (e.g., Pending, In Progress, etc.)
  },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt timestamps

// Create the model based on the schema
const Order = mongoose.model('Order', orderSchema);

export default Order;
