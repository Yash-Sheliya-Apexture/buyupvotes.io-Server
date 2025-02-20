// // controllers/notificationController.js
// import Order from '../models/Order.js';

// // Get a single order by orderId (Admin only)
// export const getSingleOrder = async (req, res) => {
//     const { orderId } = req.params;  // Extract orderId from parameters
//     try {
//         const order = await Order.findOne({ orderId: orderId }); // Find the order
//         if (!order) {
//             return res.status(404).json({ message: "Order not found." });
//         }
//         res.status(200).json(order); // Send back the order
//     } catch (err) {
//         console.error('Error fetching single order (admin):', err);
//         res.status(500).json({ message: 'Failed to retrieve order', error: err.message }); // Include error message
//     }
// };

// // Function to get admin notifications
// // Function to get admin notifications
// export const getAdminNotifications = async (req, res) => {
//     try {
//         // Fetch recent orders with "Pending" status
//         const newOrders = await Order.find({ status: 'Pending' })
//             .sort({ createdAt: -1 }) // Sort by creation date (most recent first)
//             .limit(5)  // Limit to recent 5 orders and convert to plain JavaScript objects
//             .lean();

//         // Fetch recent orders that have been updated (status changed)
//         const updatedOrders = await Order.find({
//             $nor: [{ status: 'Pending' }],  // Exclude Pending orders (already covered)
//         })
//             .sort({ updatedAt: -1 }) // Sort by update date (most recent first)
//             .limit(5)
//             .lean();

//         // Combine and format notifications
//         const notifications = [
//             ...newOrders.map(order => ({
//                 id: order._id,
//                 type: 'new_order',
//                 message: `New order placed: Order ID ...${order.orderId.slice(-4)}`,
//                 details: `User ID: ...${order.userId.slice(-4)}, $${order.calculatedPrice.toFixed(2)}`,
//                 time: order.createdAt,
//                 isRead: order.isRead || false,
//                 orderId: order.orderId,
//             })),
//             ...updatedOrders.map(order => ({
//                 id: order._id,
//                 type: 'order_status_update',
//                 message: `Order status updated: Order ID ...${order.orderId.slice(-4)}`,
//                 details: `Status: ${order.status}, User ID: ...${order.userId.slice(-4)}`,
//                 time: order.updatedAt,
//                 isRead: order.isRead || false,
//                 orderId: order.orderId,
//             })),
//         ];

//         // Sort all notifications by time (most recent first)
//         notifications.sort((a, b) => new Date(b.time) - new Date(a.time));

//         res.status(200).json(notifications);
//     } catch (err) {
//         console.error('Error fetching admin notifications:', err);
//         res.status(500).json({ message: 'Failed to retrieve admin notifications' });
//     }
// };

// export const markNotificationAsRead = async (req, res) => {
//   const { notificationId } = req.params;
//   try {
//       // Find the order by its _id
//       const order = await Order.findById(notificationId);

//       if (!order) {
//           return res.status(404).json({ message: 'Notification not found' });
//       }

//       // Update the isRead property to true
//       order.isRead = true;

//       // Save the updated order
//       await order.save();

//       // Respond with a success message
//       res.status(200).json({ message: 'Notification marked as read' });
//   } catch (error) {
//       console.error('Error marking notification as read:', error);
//       res.status(500).json({ message: 'Failed to mark notification as read', error: error.message });
//   }
// };


import Order from '../models/Order.js';

// Function to get admin notifications
export const getAdminNotifications = async (req, res) => {
    try {
        // Fetch recent orders with "Pending" status
        const newOrders = await Order.find({ status: 'Pending', isRead: false })
            .sort({ createdAt: -1 }) // Sort by creation date (most recent first)
            .limit(5)  // Limit to recent 5 orders and convert to plain JavaScript objects
            .lean();

        // Fetch recent orders that have been updated (status changed)
        const updatedOrders = await Order.find({
            $nor: [{ status: 'Pending' }],  // Exclude Pending orders (already covered)
            isRead: false,
        })
            .sort({ updatedAt: -1 }) // Sort by update date (most recent first)
            .limit(5)
            .lean();

        // Combine and format notifications
        const notifications = [
            ...newOrders.map(order => ({
                id: order._id,
                type: 'new_order',
                message: `New order placed: Order ID: ${order.orderId.substring(0, 4)}`,
                details: `User ID: ${order.userId.substring(0, 4)}, $${order.calculatedPrice.toFixed(2)}`,
                calculatedPrice:`$${order.calculatedPrice.toFixed(2)}`,
                time: order.createdAt,
                isRead: order.isRead || false,
                orderId: order.orderId,
            })),
            ...updatedOrders.map(order => ({
                id: order._id,
                type: 'order_status_update',
                message: `Order status updated: Order ID ...${order.orderId.slice(-4)}`,
                details: `Status: ${order.status}, User ID: ...${order.userId.slice(-4)}`,
                time: order.updatedAt,
                isRead: order.isRead || false,
                orderId: order.orderId,
            })),
        ];

        // Sort all notifications by time (most recent first)
        notifications.sort((a, b) => new Date(b.time) - new Date(a.time));

        res.status(200).json(notifications);
    } catch (err) {
        console.error('Error fetching admin notifications:', err);
        res.status(500).json({ message: 'Failed to retrieve admin notifications' });
    }
};

export const markNotificationAsRead = async (req, res) => {
    const { notificationId } = req.params;
    try {
        // Find the order by its _id
        const order = await Order.findById(notificationId);

        if (!order) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        // Update the isRead property to true if it's not already true
        if (!order.isRead) {
            order.isRead = true;
            await order.save();
        }

        // Respond with a success message
        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ message: 'Failed to mark notification as read', error: error.message });
    }
};