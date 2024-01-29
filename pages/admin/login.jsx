import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";

// Login component for the admin dashboard
const Login = () => {
    // State variables to manage username, password, and error state
    const [Username, setUsername] = useState(null);
    const [password, setpassword] = useState(null);
    const [error, seterror] = useState(false);

    // Next.js router instance
    const router = useRouter();

    // Function to handle login button click
    const handleClick = async () => {
        try {
            // Make a POST request to the server for authentication
            await axios.post("http://localhost:3000/api/login", {
                Username,
                password,
            });

            // Redirect to the admin dashboard on successful login
            router.push("/admin");

        } catch (err) {
            console.log(err);
            // Set error state if login fails
            seterror(true);
        }
    };

    // JSX structure for the login form
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Admin Dashboard</h1>
                {/* Input fields for username and password */}
                <input
                    placeholder="username..."
                    className={styles.input}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    placeholder="password..."
                    type="password"
                    className={styles.input}
                    onChange={(e) => setpassword(e.target.value)}
                />
                {/* Button to trigger login attempt */}
                <button onClick={handleClick} className={styles.button}>
                    Sign in
                </button>
                {/* Error message if login fails */}
                {error && <span className={styles.error}>Incorrect Credentials, please try again</span>}
            </div>
        </div>
    );
};

export default Login;
