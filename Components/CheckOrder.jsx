// Importing necessary dependencies and styles
import { useRouter } from "next/router";
import styles from "../styles/CheckOrder.module.css"
import CheckOrder2 from "./CheckOrder2";
import CheckOrder3 from "./CheckOrder3"

// Functional component 'CheckOrder' to display and check the status of orders
const CheckOrder = ({ orders, setclose }) => {
  // Using the useRouter hook from Next.js
  const router = useRouter();
  
  // Function to handle checking the status of a specific order
  const handleCheckStatus = (orderId) => {
    // Implement logic to navigate to Orders/{orderId} page
    router.push(`/Orders/${orderId}`);
  };

  // Determine which wrapper style to use based on conditions
  const getWrapperStyle = () => {
    if (orders && orders.length > 0) {
      return styles.wrapper1;
    } else if (orders && orders.length === 0) {
      return styles.wrapper2;
    } else {
      return styles.wrapper3;
    }
  };

  // Determine which close button style to use based on conditions
  const getCloseStyle = () => {
    if (orders && orders.length > 0) {
      return styles.close1;
    } else if (orders && orders.length === 0) {
      return styles.close2;
    } else {
      return styles.close3;
    }
  };

  return (
    // Main container for the 'CheckOrder' component
    <div className={styles.container}>
      {/* Close button to close the 'CheckOrder' component */}
      <span onClick={() => setclose(true)} className={getCloseStyle()}>X</span>

      {/* Wrapper div with dynamic styling based on conditions */}
      <div className={getWrapperStyle()}>
        {/* Title for the 'CheckOrder' component */}
        <h2 className={styles.title}>Your Orders</h2>

        {/* Conditional rendering based on the presence and length of orders */}
        {orders && orders.length > 0 ? (
          // Displaying individual orders when there are orders
          orders.map((order) => (
            <ul className={styles.card} key={order._id}>
              <p className={styles.item}>{`Order ID: ${order._id}`}</p>
              <p className={styles.item}>{`Customer: ${order.customer}`}</p>
              <p className={styles.item}>{`Address: ${order.address}`}</p>
              <p className={styles.item}>{`Total: £${order.total}`}</p>
              <button  className={styles.btn} onClick={() => handleCheckStatus(order._id)}>
                Check Status
              </button>
            </ul>
          ))
        ) : orders && orders.length === 0 ? (
          // Displaying an alternative component when there are no orders
          <CheckOrder2/>
        ) : (
          // Displaying another alternative component for other conditions
          <CheckOrder3/>
        )}
      </div>
    </div>
  );
};

// Exporting the 'CheckOrder' component
export default CheckOrder;
