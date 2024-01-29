// Importing necessary dependencies and styles
import { useEffect, useState } from "react";
import styles from "../styles/CheckOrder.module.css";

// Functional component 'CheckOrderButton' to display a button for checking orders
const CheckOrderButton = ({ setclose, user, token }) => {
  // State to manage the client token and active user
  const [clientToken, setToken] = useState(token);
  const [ActiveUser, setUser] = useState(null);

  // useEffect to update state based on the received props
  useEffect(() => {
    // Check if the received token is the admin token
    if (token === process.env.adminToken) {
      // Set the client token and active user
      setToken(token);
      setUser(user);
    }
  }, [token, user]);

  return (
    // Button to trigger the display of orders
    <button onClick={() => setclose(false)} className={styles.checkOrderButton}>
      {/* Displaying user-specific text if the client token and active user are present */}
      {clientToken && ActiveUser !== null ? (`${user}'s Orders`) : ("Check Orders")}
    </button>
  );
};

// Exporting the 'CheckOrderButton' component
export default CheckOrderButton;
