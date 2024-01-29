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
      // Check if the user exists
      const user = await User.findOne({ username });

      // Validate the password
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      // Generate JWT and set cookie
      const token = generateJwtAndSetCookie(res, username);

      res.status(200).json({ success: true, message: "Login successful" });

    } catch (error) {
      console.error("Login failed", error);
      res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
  }
};
