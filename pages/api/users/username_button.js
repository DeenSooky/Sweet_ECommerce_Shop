// Import necessary libraries
import dbConnect from "../../../util/mongo";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  const { method, cookies } = req;
  const token = cookies.token;

  await dbConnect();

  if (method === "GET") {
    try {
      if (token) {
        // Verify the token to get user information
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user information using the decoded username
        const username = decodedToken.username;

        // Send only the username in the response
        res.status(200).json(username);
      } else {
        // User is not logged in, set username to null
        const username = null;
        res.status(200).json(username);
      }
    } catch (err) {
      console.error("Error fetching user username:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
