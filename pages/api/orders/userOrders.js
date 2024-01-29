// Import necessary modules
import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";
import User from "../../../models/Users";

// Define the API route handler
const handler = async (req, res) => {
  const { method, cookies } = req;
  const userToken = cookies.token;

  // Connect to the MongoDB database
  await dbConnect();

  // Handling GET request
  if (method === "GET") {
    try {
      if (userToken) {
        // User is logged in, fetch only their orders
        const user = await User.findOne({ token: userToken }).populate('orders');

        if (user) {
          const userOrders = user.orders || [];
          res.status(200).json({ orders: userOrders });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } else {
        // User is not logged in, fetch all orders
        const orders = await Order.find();
        res.status(200).json({ orders });
      }
    } catch (err) {
      console.error("Error fetching user orders:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

// Export the handler function
export default handler;
