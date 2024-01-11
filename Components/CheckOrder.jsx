import { useRouter } from "next/router";
import styles from "../styles/CheckOrder.module.css"
import CheckOrder2 from "./CheckOrder2";
import CheckOrder3 from "./CheckOrder3"

const CheckOrder = ({ orders, setclose }) => {
  const router = useRouter();
  

  const handleCheckStatus = (orderId) => {
    // Implement logic to navigate to Orders/{orderId} page
    router.push(`/Orders/${orderId}`);
    console.log(`Checking status for order ${orderId}`);
  };

    // Determine which wrapper style to use based on conditions
    const getWrapperStyle = () => {
      if (orders && orders.length> 0) {
        return styles.wrapper1;
      } else if (orders && orders.length === 0) {
        return styles.wrapper2;
      } else {
        return styles.wrapper3;
      }
    };

    const getCloseStyle = () => {
      if (orders && orders.length> 0) {
        return styles.close1;
      } else if (orders && orders.length === 0) {
        return styles.close2;
      } else {
        return styles.close3;
      }
    };

  

  return (
    <div className={styles.container}>
      <span onClick={() => setclose(true)} className={getCloseStyle()}>X</span>
      <div className={getWrapperStyle()}>
        <h2 className={styles.title}>Your Orders</h2>
        {orders && orders.length > 0 ? (orders.map((order) => (
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
            <CheckOrder2/>
          ):(
            <CheckOrder3/>
          )
        }
      </div>
    </div>
  );
};

export default CheckOrder;

