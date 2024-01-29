// Importing necessary dependencies and styles
import { useRouter } from "next/router";
import styles from "../styles/Add.module.css";

// Functional component 'AdminDashboard'
const AdminDashboard = () => {
    // Using the useRouter hook from Next.js
    const router = useRouter();

    // Function to handle the click event and navigate to the "/admin" route
    const handleClick = () => {
        router.push("/admin");
    };

    // Rendering a button for navigating to the admin dashboard
    return (
        <button 
            className={styles.mainAddButton} 
            style={{
                marginLeft: "1720px", 
                border: "none",
                position: "relative",
                top: "38px",
            }} 
            onClick={handleClick}>
            Admin Dashboard
        </button>
    );
};

// Exporting the 'AdminDashboard' component
export default AdminDashboard;
