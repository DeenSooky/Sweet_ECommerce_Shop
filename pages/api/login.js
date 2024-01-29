import cookie from "cookie";

const handler = (req, res) => {
    if (req.method === "POST") {
        const { Username, password } = req.body;

        // Check if the provided credentials match the admin credentials from environment variables
        if (Username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            // Set adminToken in a cookie
            res.setHeader("Set-Cookie", cookie.serialize("adminToken", process.env.TOKEN, {
                maxAge: 60 * 60,
                sameSite: "strict",
                path: "/",
            }));

            // Send a success response
            res.status(200).json("Successful");
        } else {
            // Send an error response for incorrect credentials
            res.status(400).json("Incorrect Credentials");
        }
    }
};

export default handler;
