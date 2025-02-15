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





// // controllers/adminController.js
// import Order from '../models/Order.js';
// import User from '../models/User.js';


// // Get All Users (Admin only)
// export const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password -refreshToken -otp -otpExpiration -resetToken -resetTokenExpiration'); // Exclude sensitive fields

//         res.status(200).json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ message: 'Failed to fetch users' });
//     }
// };


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
//             if (!['Pending', 'In Progress', 'Completed', 'Partial', 'Canceled'].includes(status)) {
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


// // controllers/adminController.js
// import Order from '../models/Order.js';
// import User from '../models/User.js';


// // Get All Users (Admin only)
// export const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password -refreshToken -otp -otpExpiration -resetToken -resetTokenExpiration'); // Exclude sensitive fields

//         res.status(200).json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ message: 'Failed to fetch users' });
//     }
// };


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
//     const { status, completedVotes, started } = req.body;  // Include started

//     try {
//         const order = await Order.findOne({ orderId });

//         if (!order) {
//             return res.status(404).json({ message: "Order not found." });
//         }

//         if (status) {
//             if (!['Pending', 'In Progress', 'Completed', 'Partial', 'Canceled'].includes(status)) {
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

//         if (started !== undefined) {
//              order.started = started;
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


// import Order from '../models/Order.js';
// import User from '../models/User.js';

// // Get All Users (Admin only)
// export const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password -refreshToken -otp -otpExpiration -resetToken -resetTokenExpiration'); // Exclude sensitive fields
//         res.status(200).json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ message: 'Failed to fetch users' });
//     }
// };

// // Get a Single User (Admin Only)
// export const getUser = async (req, res) => {
//     const { userId } = req.params;

//     try {
//         const user = await User.findById(userId).select('-password -refreshToken -otp -otpExpiration -resetToken -resetTokenExpiration'); // Exclude sensitive fields

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         console.error('Error fetching user:', error);

//         if (error.name === 'CastError' && error.kind === 'ObjectId') {
//             return res.status(400).json({ message: 'Invalid user ID format' }); // Handle invalid ObjectID
//         }

//         res.status(500).json({ message: 'Failed to fetch user' });
//     }
// };

// export const getUserOrders = async (req, res) => {
//     try {
//       const userId = req.user._id; // From auth middleware, indicating currently logged in user
//       const orders = await Order.find({ userId: userId });  // Find order for that user
//       res.status(200).json(orders);
//     } catch (err) {
//       console.error('Error fetching user orders:', err);
//       res.status(500).json({ message: 'Failed to retrieve orders' });
//     }
//   };

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
//     const { status, completedVotes, started } = req.body;  // Include started

//     try {
//         const order = await Order.findOne({ orderId });

//         if (!order) {
//             return res.status(404).json({ message: "Order not found." });
//         }

//         if (status) {
//             if (!['Pending', 'In Progress', 'Completed', 'Partial', 'Canceled'].includes(status)) {
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

//         if (started !== undefined) {
//              order.started = started;
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






// import Order from '../models/Order.js';
// import User from '../models/User.js';

// // Get All Users (Admin only)
// export const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password -refreshToken -otp -otpExpiration -resetToken -resetTokenExpiration'); // Exclude sensitive fields
//         res.status(200).json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ message: 'Failed to fetch users' });
//     }
// };

// // Get a Single User (Admin Only)
// export const getUser = async (req, res) => {
//     const { userId } = req.params;

//     try {
//         const user = await User.findById(userId).select('-password -refreshToken -otp -otpExpiration -resetToken -resetTokenExpiration'); // Exclude sensitive fields

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         console.error('Error fetching user:', error);

//         if (error.name === 'CastError' && error.kind === 'ObjectId') {
//             return res.status(400).json({ message: 'Invalid user ID format' }); // Handle invalid ObjectID
//         }

//         res.status(500).json({ message: 'Failed to fetch user' });
//     }
// };

// export const getUserOrders = async (req, res) => {
//     try {
//       const { userId } = req.params; // Get userId from the request parameters
//     console.log("The userId is", req.user._id); // Log this parameter to see the function
//       const orders = await Order.find({ userId: userId });  // Find order for that user
//       res.status(200).json(orders);
//     } catch (err) {
//       console.error('Error fetching user orders:', err);
//       res.status(500).json({ message: 'Failed to retrieve orders' });
//     }
//   };
  
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
//     const { status, completedVotes, started } = req.body;  // Include started

//     try {
//         const order = await Order.findOne({ orderId });

//         if (!order) {
//             return res.status(404).json({ message: "Order not found." });
//         }

//         if (status) {
//             if (!['Pending', 'In Progress', 'Completed', 'Partial', 'Canceled'].includes(status)) {
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

//         if (started !== undefined) {
//              order.started = started;
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
        const users = await User.find().select('_id firstName lastName email totalAmount'); // Include _id, totalAmount, and other needed fields
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

// Helper function to calculate spent amount based on order statuses
const calculateSpentAmount = async (userId) => {
    const orders = await Order.find({ userId: userId });
    let spentAmount = 0;

    orders.forEach(order => {
        if (['Pending', 'In Progress', 'Completed', 'Partial'].includes(order.status)) {
            spentAmount += order.calculatedPrice || 0; // Use calculatedPrice
        } else if (order.status === 'Canceled') {
            spentAmount -= order.calculatedPrice || 0;
        }
    });

    return spentAmount;
};

// Get a Single User (Admin Only)
export const getUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).select('-password -refreshToken -otp -otpExpiration -resetToken -resetTokenExpiration');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const spentAmount = await calculateSpentAmount(userId);

        res.status(200).json({
            ...user.toObject(), // Convert mongoose document to plain object
            spentAmount: spentAmount,
        });
    } catch (error) {
        console.error('Error fetching user:', error);

        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        res.status(500).json({ message: 'Failed to fetch user' });
    }
};

export const getUserOrders = async (req, res) => {
    try {
      const { userId } = req.params; // Get userId from the request parameters
    console.log("The userId is", req.user._id); // Log this parameter to see the function
      const orders = await Order.find({ userId: userId });  // Find order for that user
      res.status(200).json(orders);
    } catch (err) {
      console.error('Error fetching user orders:', err);
      res.status(500).json({ message: 'Failed to retrieve orders' });
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
    const { status, completedVotes, started } = req.body;  // Include started

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

        if (started !== undefined) {
             order.started = started;
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