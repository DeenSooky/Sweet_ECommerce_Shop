// Import necessary modules
import dbConnect from "../../../util/mongo";
import BlogPost from "../../../models/BlogPost";
import User from "../../../models/Users";
import jwt from 'jsonwebtoken';

// Define the API route handler
const handler = async (req, res) => {
    // Destructure properties from the request object
    const { method, query: { id }, cookies } = req;
    const token = cookies.token;

    // Connect to the MongoDB database
    await dbConnect();

    // Decode the token to get user information
    let user = null;
    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const { username } = decodedToken;
            user = await User.findOne({ username });
        } catch (error) {
            // Return 401 status for invalid token
            res.status(401).json({ success: false, message: "Invalid token" });
            return;
        }
    }

    // Handling GET request
    if (method === "GET") {
        if (token) {
            try {
                // Fetch blogs for the specific user
                const initialBlogs = await BlogPost.find({ user: user._id });
                res.status(200).json({ initialBlogs });
            } catch (err) {
                // Handle server error
                res.status(500).json({ error: "Internal Server Error" });
            }
        } else {
            // Return 401 status for unauthenticated GET request
            return res.status(401).json("Not authenticated");
        }
    }

    // Handling PUT request
    if (method === "PUT") {
        if (!token) {
            // Return 401 status for unauthenticated PUT request
            return res.status(401).json("Not authenticated");
        }
        try {
            // Update the specified blog post
            const blog = await BlogPost.findByIdAndUpdate(id, req.body, { new: true });
            res.status(201).json(blog);
        } catch (err) {
            // Handle server error
            res.status(500).json(err);
            console.log("error blog [id] put: ", err);
        }
    }

    // Handling DELETE request
    if (method === "DELETE") {
        if (token === process.env.Token || token) {
            try {
                // Delete the specified blog post
                const blog = await BlogPost.findByIdAndDelete(id);
                res.status(201).json(blog);
            } catch (err) {
                // Handle server error
                res.status(500).json(err);
            }
        }
    }
};

// Export the handler function
export default handler;
