// Import necessary libraries
import User from "../../../models/Users";
import cookie from "cookie";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Utility function for generating JWT and setting cookie
const generateJwtAndSetCookie = (res, username) => {
  // Use the static JWT_SECRET from .env
  const jwtSecret = process.env.JWT_SECRET;

  // Generate JWT and set cookie
  const token = jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });
  res.setHeader("Set-Cookie", cookie.serialize("token", token, { maxAge: 60 * 60, sameSite: "strict", path: "/" }));
  return token;
};

// Define the API route handler
export default async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ username });

      // If the username already exists, return a 400 Bad Request response
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Username already exists" });
      }

      // Generate a salt and hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate JWT and set cookie
      const token = generateJwtAndSetCookie(res, username);

      // Create a new user without storing the token or jwtSecret in the database
      const newUser = new User({ username: username, password: hashedPassword });

      await newUser.save();

      res.status(200).json({ success: true, message: "Registration successful" });

    } catch (error) {
      console.error("Registration failed", error);

      res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
  }
};
