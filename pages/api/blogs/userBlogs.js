// Import necessary modules
import dbConnect from "../../../util/mongo";
import BlogPost from "../../../models/BlogPost";
import User from "../../../models/Users";
import jwt from "jsonwebtoken";

// Define the API route handler
const handler = async (req, res) => {
  const { method, cookies } = req;
  const token = cookies.token;

  // Connect to the MongoDB database
  await dbConnect();

  // Handling GET request
  if (method === "GET") {
    try {
      if (token) {
        // Verify the token to get user info
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch blogs for the user with the decoded username
        const user = await User.findOne({ username: decodedToken.username });
        const initialBlogs = await BlogPost.find({ user: user._id });

        res.status(200).json({ initialBlogs });
      } else {
        // User is not logged in, set blogs to null
        const initialBlogs = null;
        res.status(200).json({ initialBlogs });
      }
    } catch (err) {
      console.error("Error fetching user blogs blogs [id]:", err);
      // Handle server error
      res.status(500).json({ message: "Internal Server Error blogs [id]" });
    }
  } else {
    // Handling other HTTP methods
    res.status(405).json({ message: "Method Not Allowed blogs [id]" });
  }
};

// Export the handler function
export default handler;
