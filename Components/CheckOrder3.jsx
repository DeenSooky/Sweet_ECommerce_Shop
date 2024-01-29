// Importing styles for the component
import styles from "../styles/CheckOrder3.module.css"
import React, { useState } from "react";

// Functional component 'CheckOrder3' to provide options for checking order status
const CheckOrder3 = () => {
  // State to manage the input for order ID
  const [orderIdInput, setOrderIdInput] = useState("");

  // Function to handle checking the order status by order ID
  const handleCheckOrderById = () => {
    try {
      // Check if orderIdInput is not empty
      if (orderIdInput) {
          // You can perform additional actions or API calls here if needed
          router.push(`/Orders/${orderIdInput}`);
      } else {        
          // Displaying an error message for an invalid order ID
          <span className={styles.error}>Invalid order Id, please try again</span>
          
          // You can display a message or UI element for the user to enter their order ID
      }
    } catch (err) {
        // Handling errors, e.g., orderId doesn't exist
        console.log("Error checking order status:", err);
    }
  }

  // Rendering the component with input and button for checking order status
  return (
    <div className={styles.wrapper}> 
      {/* Message prompting the user to login/register or enter their order ID */}
      <p className={styles.msg}>Please login/register to check your orders or enter your order ID below:</p>
      
      {/* Input field for entering the order ID */}
      <input
          type="text"
          placeholder="Enter Order ID"
          value={orderIdInput}
          className={styles.input}
          onChange={(e) => setOrderIdInput(e.target.value)}
      />
      
      {/* Button to trigger checking the order status */}
      <button className={styles.btn} onClick={handleCheckOrderById}>
          Check Order Status
      </button>
    </div>
  )
}

// Exporting the 'CheckOrder3' component
export default CheckOrder3;
