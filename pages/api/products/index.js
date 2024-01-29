// Import necessary modules
import dbConnect from "../../../util/mongo.js";
import Product from "../../../models/Product.js";

// Define the API route handler
export default async function handler(req, res) {
    const { method, cookies } = req;
    const token = cookies.token;

    // Connect to the MongoDB database
    await dbConnect();

    // Handling GET request
    if (method === "GET") {
        try {
            // Fetch all products
            const products = await Product.find();
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // Handling POST request
    if (method === "POST") {
        if (token !== process.env.adminToken) {
            return res.status(401).json("Not authenticated");
        }
        try {
            // Create a new product using the request body
            const product = await Product.create(req.body);
            res.status(201).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
