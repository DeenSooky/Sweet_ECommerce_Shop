// Import necessary modules
import dbConnect from "../../../util/mongo.js";
import Product from "../../../models/Product.js";

// Define the API route handler
export default async function handler(req, res) {
    const { method, query: { id }, cookies } = req;
    const token = cookies.token;

    // Connect to the MongoDB database
    await dbConnect();

    // Handling GET request
    if (method === "GET") {
        try {
            // Fetch the product by its ID
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // Handling PUT request
    if (method === "PUT") {
        if (token !== process.env.adminToken) {
            return res.status(401).json("Not authenticated");
        }
        try {
            // Update the product by its ID with the provided request body
            const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
            res.status(201).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // Handling DELETE request
    if (method === "DELETE") {
        if (token !== process.env.adminToken) {
            return res.status(401).json("Not authenticated");
        }
        try {
            // Delete the product by its ID
            const product = await Product.findByIdAndDelete(id);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
