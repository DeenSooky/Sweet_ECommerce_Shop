import Image from "next/image";
import styles from "../../styles/Order.module.css";
import axios from "axios";

const Order = ({order}) => {

    const status = order.status;

    const statusClass = (index) => {
        
        if(index-status < 1) return styles.done
        if(index-status == 1) return styles.inProgress
        if(index-status > 1) return styles.undone 

    };

    return (
        <div className={styles.container}>

            <div className={styles.left}>
                <div className={styles.row}>
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

                            <tr  className={styles.tr}>
                                
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
                                    <span className={styles.total}>£{order.Total}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div className={styles.row}>
                    <div className={statusClass(0)}>
                        <Image  className={styles.checkedIcon} src="/img/basket.png" width={50} height={50} alt="paid"/>
                        <span><b>Payment</b></span>
                        <div className={styles.checkedIcon}>
                            <Image src="/img/tick.png" width={30} height={30} alt="checked"/>
                        </div>
                    </div>

                    <div className={statusClass(1)}>
                        <Image src="/img/box.png" width={50} height={50} alt="bike"/>
                        <span><b>Preparing</b></span>
                        <div className={styles.checkedIcon}>
                            <Image src="/img/tick.png" width={30} height={30} alt="prep"/>
                        </div>
                    </div>

                    <div className={statusClass(2)}>
                        <Image src="/img/transit.png" width={50} height={50} alt="bike"/>
                        <span><b>On the way</b></span>
                        <div className={styles.checkedIcon}>
                            <Image src="/img/tick.png" width={30} height={30} alt="prep"/>
                        </div>
                    </div>

                    <div className={statusClass(3)}>
                        <Image src="/img/party.png" width={50} height={50} alt="paid"/>
                        <span><b>Delivered</b></span>
                        <div className={styles.checkedIcon}>
                            <Image src="/img/tick.png" width={30} height={30} alt="checked"/>
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.right}>
            <div className={styles.wrapper}>
                    <h2 className={styles.title}>CART TOTAL</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Subtotal:</b>£{order.Total}
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Discount:</b>£0.00
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b>£{order.Total}
                    </div>
                    <button disabled className={styles.button}>PAID</button>

                </div>

            </div>

        </div>
    );
};

export const getServerSideProps = async ({params}) => {
    const res = await axios.get (`http://localhost:3000/api/orders/${params.id}`);
    return {
        props: {
            
            order: res.data
        }
    }
    
};

export default Order;