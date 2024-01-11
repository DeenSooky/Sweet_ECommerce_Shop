// Import necessary modules
import dbConnect from "../../../util/mongo";
import BlogPost from "../../../models/BlogPost";
import User from "../../../models/Users"
import jwt from 'jsonwebtoken'

const handler = async (req, res) => {
    const { method, cookies, body } = req;
    const token = cookies.token;
    console.log("token at blog stage: ", token)

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
            res.status(401).json({ success: false, message: "Invalid token" });
            return;
        }
    }

    if (method === "GET") {
        try {
            // Fetch all blog posts
            const blogPosts = await BlogPost.find();
            res.status(200).json(blogPosts);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    if (method === "POST") {
        try {

            if (token){
                //If the user is logged in, associate the order with the user
                const blog = await BlogPost.create({...body, user: user._id});
     
                //update the user's blog array
                user.blogs.push(blog._id);
                await user.save();
                console.log("updatedUser: ", user)
     
                res.status(201).json(blog)

            }
        } catch (err) {
            console.error("Error creating blog post:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

export default handler;