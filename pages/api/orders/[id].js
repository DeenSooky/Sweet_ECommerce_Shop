// Import necessary modules
import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

// Define the API route handler
const handler = async (req, res) => {
  const { method, query: { id } } = req;

  // Connect to the MongoDB database
  await dbConnect();

  // Handling GET request
  if (method === "GET") {
    try {
      // Find the order by its ID
      const order = await Order.findById(id);
      // Send the order as a JSON response
      res.status(200).json(order);
    } catch (err) {
      // Handle server error
      res.status(500).json(err);
    }
  }

  // Handling PUT request
  if (method === "PUT") {
    try {
      // Update the order with the new data
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      // Send the updated order as a JSON response
      res.status(200).json(order);
    } catch (err) {
      // Handle server error
      res.status(500).json(err);
    }
  }
};

// Export the handler function
export default handler;
