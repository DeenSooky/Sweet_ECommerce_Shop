// Import necessary modules
import dbConnect from "../../../util/mongo";
import BlogPost from "../../../models/BlogPost";
import User from "../../../models/Users"
import jwt from 'jsonwebtoken'

const handler = async (req, res) => {
    const { method, query: {id}, cookies } = req;
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
            res.status(401).json({ success: false, message: "Invalid token" });
            return;
        }
    }

    if (method === "GET") {
        try {
            // Fetch blogs for the specific user
            const initialBlogs = await BlogPost.find({ user: user._id });
            res.status(200).json({ initialBlogs });
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    if(method === "PUT"){
        if(!token){
            return res.status(401).json("Not authenticated")
        }
        try{
            const blog = await BlogPost.findByIdAndUpdate(id, req.body, {new: true})
            res.status(201).json(blog)
        }catch(err){
            res.status(500).json(err)
            console.log("error blog [id] put: ", err)
        }
    }

    if(method === "DELETE"){
        if (token === process.env.Token || token)
        {
            try{
                const blog = await BlogPost.findByIdAndDelete(id)
                res.status(201).json(blog)
            }catch(err){
                res.status(500).json(err)
            }
        }
    }
};

export default handler;