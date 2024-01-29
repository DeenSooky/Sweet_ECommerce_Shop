// Importing necessary modules and component styles
import styles from "../styles/orderDetailed.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

// Functional component 'OrderDetailed'
const OrderDetailed = ({ total, createOrder, onCancel }) => {
    // State to manage customer information
    const [customer, setCustomer] = useState("");
    const [address, setAddress] = useState("");
    const router = useRouter()

    // Function to handle order creation
    const handleClick = () => {
        // Creating an order and passing customer details
        createOrder({ customer, address, total, method: 0 });
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* Close button */}
                <span onClick={onCancel} className={styles.close}>X</span>
                {/* Title showing the amount to pay after delivery */}
                <h1 className={styles.title}>Amount to pay after delivery £{`${total.toFixed(2)}`}</h1>

                {/* Customer input fields */}
                <div className={styles.item}>
                    <label className={styles.label}>Name Surname</label>
                    <input
                        placeholder="Jon Doe"
                        type="text"
                        className={styles.input}
                        onChange={(e) => setCustomer(e.target.value)}
                    />
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Phone Number</label>
                    <input
                        type="text"
                        placeholder="+44 7548294734"
                        className={styles.input}
                    />
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Address</label>
                    <textarea
                        rows={5}
                        placeholder="148 Baggot Street, BM3 5NG"
                        type="text"
                        className={styles.textarea}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                {/* Order button */}
                <button className={styles.button} onClick={handleClick}>
                    Order
                </button>
            </div>
        </div>
    );
};

// Exporting the 'OrderDetailed' component
export default OrderDetailed;
