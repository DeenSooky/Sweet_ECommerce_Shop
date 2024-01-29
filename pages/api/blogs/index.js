// Import necessary modules
import dbConnect from "../../../util/mongo";
import BlogPost from "../../../models/BlogPost";
import User from "../../../models/Users";
import jwt from 'jsonwebtoken';

// Define the API route handler
const handler = async (req, res) => {
    // Destructure properties from the request object
    const { method, cookies, body } = req;
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
            console.error("Error decoding token:", error);
            // Return 401 status for invalid token
            res.status(401).json({ success: false, message: "Invalid token" });
            return;
        }
    }

    // Handling GET request
    if (method === "GET") {
        try {
            // Fetch all blog posts
            const blogPosts = await BlogPost.find();
            res.status(200).json(blogPosts);
        } catch (err) {
            // Handle server error
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // Handling POST request
    if (method === "POST") {
        try {
            if (token) {
                // If the user is logged in, associate the blog post with the user
                const blog = await BlogPost.create({ ...body, user: user._id });

                // Update the user's blog array
                user.blogs.push(blog._id);
                await user.save();

                res.status(201).json(blog);
            }
        } catch (err) {
            console.error("Error creating blog post:", err);
            // Handle server error
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

// Export the handler function
export default handler;
