import { useRouter } from "next/router";
import styles from "../styles/Add.module.css";

const AdminDashboard = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/admin");
    };

    return (
        <button className={styles.mainAddButton} 
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

export default AdminDashboard;