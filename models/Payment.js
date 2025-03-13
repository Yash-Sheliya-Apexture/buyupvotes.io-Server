// import mongoose from 'mongoose';

// const paymentSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   cardNumber: { type: String, required: true },
//   cardExpiry: { type: String, required: true },
//   cardCvc: { type: String, required: true },
//   cardHolderName: { type: String, required: true },
//   amount: { type: Number, required: true },
//   type: { type: String, required: true },
//   tokens: { type: Number, default: 0 },
//   coins: { type: Number, default: 0 },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User model
// }, { timestamps: true });

// const Payment = mongoose.model('Payment', paymentSchema);

// export default Payment;


// import mongoose from 'mongoose';

// const paymentSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   cardNumber: { type: String, required: true },
//   cardExpiry: { type: String, required: true },
//   cardCvc: { type: String, required: true },
//   cardHolderName: { type: String, required: true },
//   amount: { type: Number, required: true },
//   type: { type: String, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User model
// }, { timestamps: true });

// const Payment = mongoose.model('Payment', paymentSchema);

// export default Payment;



// models/Payment.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: String }, // Add the Cryptomus Order ID
    status: { type: String, default: 'pending' }, // Payment status (pending, paid, etc.)
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;