import styles from "../styles/CheckOrder3.module.css"
import React, { useState } from "react";

const CheckOrder3 = () => {

    const [orderIdInput, setOrderIdInput] = useState("");

    const handleCheckOrderById = (orderIdInput) => {
        try{
          if (orderIdInput) {
            // Implement logic to check order status by order ID
            console.log(`Checking status for order ${orderIdInput}`);
            // You can perform additional actions or API calls here if needed
            router.push(`/Orders/${orderIdInput}`);
          } else {
            // Handle the case where orderIdInput is empty
            console.log("Please enter your order ID");
      
            <span className={styles.error}>Invalid order Id, please try again</span>
      
            // You can display a message or UI element for the user to enter their order ID
          }
        }catch(err){
          console.log("orderId doesn't exist")
        }
    }

    return (
        <div className={styles.wrapper}> 
            <p className={styles.msg}>Please login/register to check your orders or enter your order ID below:</p>
            <input
                type="text"
                placeholder="Enter Order ID"
                value={orderIdInput}
                className={styles.input}
                onChange={(e) => setOrderIdInput(e.target.value)}
            />
            <button className={styles.btn} onClick={() => handleCheckOrderById(orderIdInput)}>Check Order Status</button>

        </div>
    )
}

export default CheckOrder3