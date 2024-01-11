import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";
import User from "../../../models/Users";
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  const { method, cookies, body } = req;
  const token = cookies.token;
  console.log("Token at order stage:", token);

  await dbConnect();

  // Decode the token to get user information
  let user = null;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { username } = decodedToken;
      user = await User.findOne({ username });
    } catch (error) {
      console.error("Error decoding token:", error);
      res.status(401).json({ success: false, message: "Invalid token" });
      return;
    }
  }

  if (method === "GET") {
    try {
      // If a user is logged in, fetch orders associated with the user
      const orders = await Order.find()
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      if (!token) {
        // If the user is not logged in, create the order without associating it with a user
        const order = await Order.create({ ...body });
        return res.status(201).json(order);
      } else {
        // User is logged in, associate the order with the user
        try {
          // Create the order with the associated user ID
          const order = await Order.create({ ...body, user: user._id });

          // Update the user's orders array
          user.orders.push(order._id);
          await user.save();
          console.log("updatedUser:", user);

          res.status(201).json(order);
        } catch (userError) {
          console.error("Error creating order:", userError);
          res.status(500).json("Error creating order");
        }
      }
    } catch (err) {
      console.error("Error creating order:", err);
      res.status(500).json(err);
    }
  }
};

export default handler;
