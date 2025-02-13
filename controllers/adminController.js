// // controllers/adminController.js
// import Order from '../models/Order.js';

// // Function to get all orders (Admin only)
// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({}); // Get all orders
//         res.status(200).json(orders);
//     } catch (err) {
//         console.error('Error fetching all orders (admin):', err);
//         res.status(500).json({ message: 'Failed to retrieve orders' });
//     }
// };

// // Function to update order status and other charges (Admin only)
// export const updateOrder = async (req, res) => {
//     const { orderId } = req.params;
//     const { status, otherCharges } = req.body;

//     try {
//         const order = await Order.findOne({ orderId });

//         if (!order) {
//             return res.status(404).json({ message: "Order not found." });
//         }

//         if (status) {
//             if (!['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
//                 return res.status(400).json({ message: 'Invalid status value' });
//             }
//             order.status = status;
//         }

//          if (otherCharges !== undefined) {  // Allow null/0 to clear the value
//             if (typeof otherCharges !== 'number' ) {
//                return res.status(400).json({ message: 'Invalid otherCharges value' });
//             }
//             order.otherCharges = otherCharges;
//         }


//         await order.save();

//         res.status(200).json({ message: 'Order updated successfully' });
//     } catch (err) {
//         console.error('Error updating order (admin):', err);
//         res.status(500).json({ message: 'Failed to update order' });
//     }
// };

// // Function to delete order (Admin only)
// export const deleteOrder = async (req, res) => {
//     const { orderId } = req.params;

//     try {
//         const order = await Order.findOneAndDelete({ orderId });

//         if (!order) {
//             return res.status(404).json({ message: "Order not found." });
//         }

//         res.status(200).json({ message: 'Order deleted successfully' });
//     } catch (err) {
//         console.error('Error deleting order (admin):', err);
//         res.status(500).json({ message: 'Failed to delete order' });
//     }
// };


// // controllers/adminController.js
// import Order from '../models/Order.js';

// // Function to get all orders (Admin only)
// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({}); // Get all orders
//         res.status(200).json(orders);
//     } catch (err) {
//         console.error('Error fetching all orders (admin):', err);
//         res.status(500).json({ message: 'Failed to retrieve orders' });
//     }
// };

// // Function to update order status and other charges (Admin only)
// export const updateOrder = async (req, res) => {
//     const { orderId } = req.params;
//     const { status, completedVotes } = req.body;  // Include completedVotes

//     try {
//         const order = await Order.findOne({ orderId });

//         if (!order) {
//             return res.status(404).json({ message: "Order not found." });
//         }

//         if (status) {
//             if (!['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
//                 return res.status(400).json({ message: 'Invalid status value' });
//             }
//             order.status = status;
//         }

//         if (completedVotes !== undefined) {
//             if (typeof completedVotes !== 'number') {
//                 return res.status(400).json({ message: 'Invalid completedVotes value' });
//             }
//             order.completedVotes = completedVotes;
//         }

//         await order.save();

//         res.status(200).json({ message: 'Order updated successfully' });
//     } catch (err) {
//         console.error('Error updating order (admin):', err);
//         res.status(500).json({ message: 'Failed to update order' });
//     }
// };

// // Function to delete order (Admin only)
// export const deleteOrder = async (req, res) => {
//     const { orderId } = req.params;

//     try {
//         const order = await Order.findOneAndDelete({ orderId });

//         if (!order) {
//             return res.status(404).json({ message: "Order not found." });
//         }

//         res.status(200).json({ message: 'Order deleted successfully' });
//     } catch (err) {
//         console.error('Error deleting order (admin):', err);
//         res.status(500).json({ message: 'Failed to delete order' });
//     }
// };

// controllers/adminController.js
import Order from '../models/Order.js';
import User from '../models/User.js';


// Get All Users (Admin only)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -refreshToken -otp -otpExpiration -resetToken -resetTokenExpiration'); // Exclude sensitive fields

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};


// Function to get all orders (Admin only)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}); // Get all orders
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching all orders (admin):', err);
        res.status(500).json({ message: 'Failed to retrieve orders' });
    }
};

// Function to update order status and other charges (Admin only)
export const updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const { status, completedVotes } = req.body;  // Include completedVotes

    try {
        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        if (status) {
            if (!['Pending', 'In Progress', 'Completed', 'Partial', 'Canceled'].includes(status)) {
                return res.status(400).json({ message: 'Invalid status value' });
            }
            order.status = status;
        }

        if (completedVotes !== undefined) {
            if (typeof completedVotes !== 'number') {
                return res.status(400).json({ message: 'Invalid completedVotes value' });
            }
            order.completedVotes = completedVotes;
        }

        await order.save();

        res.status(200).json({ message: 'Order updated successfully' });
    } catch (err) {
        console.error('Error updating order (admin):', err);
        res.status(500).json({ message: 'Failed to update order' });
    }
};

// Function to delete order (Admin only)
export const deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findOneAndDelete({ orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error('Error deleting order (admin):', err);
        res.status(500).json({ message: 'Failed to delete order' });
    }
};