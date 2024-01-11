// Import necessary libraries
import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";
import User from "../../../models/Users";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  const { method, cookies, body } = req;
  const token = cookies.token;

  console.log('Received token:', token);

  await dbConnect();

  if (method === "GET") {
    try {
      if (token) {
        // Verify the token to get user information
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decodedToken);

        // Fetch orders for the user with the decoded username
        const user = await User.findOne({ username: decodedToken.username });
        const orders = await Order.find({ user: user._id });
        res.status(200).json({ orders });
        console.log("User orders:", orders);
      } else {
        // User is not logged in, set orders to null
        const orders = null;
        res.status(200).json({ orders });
        console.log("rndUser orders:", orders);
      }
    } catch (err) {
      console.error("Error fetching user orders:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;