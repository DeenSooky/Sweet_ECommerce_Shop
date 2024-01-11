// Import necessary modules
import dbConnect from "../../../util/mongo";
import BlogPost from "../../../models/BlogPost";
import User from "../../../models/Users"
import jwt from "jsonwebtoken"

const handler = async (req, res) => {
  
  const {method, cookies} = req;
  const token = cookies.token;

  console.log("token at blogs [id]: ", token)

  await dbConnect();

  if (method === "GET") {
    try{
      if (token){

        //Verify the token to get user info
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Decoded token blogs [id]:", decodedToken)

        //Fetch blogs for the user with the decoded username
        const user = await User.findOne({username: decodedToken.username});
        console.log("user userBlogs.js: ", user)
        const initialBlogs = await BlogPost.find({user: user._id});


        console.log("intialBlogPosts user [id]:", initialBlogs)
        res.status(200).json({initialBlogs})
      }else {
        //User is not loggedin, set blogs to null
        const initialBlogs = null;
        res.status(200).json({initialBlogs})
        console.log("intialBlogPosts user [id]:", initialBlogs)
      }

    }catch(err){
      console.error("Error fetching user blogs blogs [id]:", err)
      res.status(500).json({message: "Internal Server Error blogs [id]"})
    }
  } else {
    res.status(405).json({message : "Method Not Allowed blogs [id]"})
  }
};

export default handler;
