// Importing styles for the component
import styles from "../styles/CheckOrder2.module.css"

// Functional component 'CheckOrder2' to display a message when there are no orders
const CheckOrder2 = () => {
    return (
        // Main container for the 'CheckOrder2' component
        <div className={styles.container}>
            {/* Message informing the user that no orders have been made */}
            <p className={styles.msg} style={{marginRight: "250px"}}>
                It seems you have not made an order, try having a look at our menu. Happy Shopping
            </p>
        </div>
    );
}

// Exporting the 'CheckOrder2' component
export default CheckOrder2;
