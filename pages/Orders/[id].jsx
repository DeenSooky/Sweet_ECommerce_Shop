// Import necessary libraries and components
import Image from "next/image";
import styles from "../../styles/Order.module.css";
import axios from "axios";

// Order component for displaying order details
const Order = ({ order }) => {
  // Extract status from the order
  const status = order.status;

  // Function to determine the status class based on the order status and the current index
  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          {/* Table displaying order details */}
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tr}>
                <td>
                  <span className={styles.id}>{order._id}</span>
                </td>
                <td>
                  <span className={styles.customers}>{order.customer}</span>
                </td>
                <td>
                  <span className={styles.address}>{order.address}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    £{`${order.total.toFixed(2)}`}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.row}>
          {/* Status icons and information */}
          <div className={statusClass(0)}>
            <Image
              className={styles.checkedIcon}
              src="/img/basket.png"
              width={100}
              height={100}
              alt="paid"
            />
            <span>
              <b>Payment</b>
            </span>
            <div className={styles.checkedIcon}>
              <Image src="/img/tick.png" width={50} height={50} alt="checked" />
            </div>
          </div>

          <div className={statusClass(1)}>
            <Image src="/img/box.png" width={100} height={100} alt="bike" />
            <span>
              <b>Preparing</b>
            </span>
            <div className={styles.checkedIcon}>
              <Image src="/img/tick.png" width={50} height={50} alt="prep" />
            </div>
          </div>

          <div className={statusClass(2)}>
            <Image
              src="/img/transit.png"
              width={100}
              height={100}
              alt="bike"
            />
            <span>
              <b>On the way</b>
            </span>
            <div className={styles.checkedIcon}>
              <Image src="/img/tick.png" width={50} height={50} alt="prep" />
            </div>
          </div>

          <div className={statusClass(3)}>
            <Image src="/img/party.png" width={100} height={100} alt="paid" />
            <span>
              <b>Delivered</b>
            </span>
            <div className={styles.checkedIcon}>
              <Image src="/img/tick.png" width={50} height={50} alt="checked" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.wrapper}>
          {/* Display cart total */}
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>
            £{`${order.total.toFixed(2)}`}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>£0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>
            £{`${order.total.toFixed(2)}`}
          </div>
          <button disabled className={styles.button}>
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};

// Server-side props to fetch order data based on the provided ID
export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/orders/${params.id}`
  );
  return {
    props: { order: res.data },
  };
};

export default Order;
