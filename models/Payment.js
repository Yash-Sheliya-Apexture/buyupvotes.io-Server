import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
    {
        email: { type: String, required: true },
        cardNumber: { type: String, required: true },
        cardExpiry: { type: String, required: true },
        cardCvc: { type: String, required: true },
        cardHolderName: { type: String, required: true },
        amount: { type: Number, required: true },
        type: { type: String, required: true },
        tokens: { type: Number },
        coins: { type: Number },

    },
    {
        timestamps: true,
    }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;