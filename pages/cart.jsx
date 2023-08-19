import Image from "next/image"
import styles from "../styles/Cart.module.css"
import { useDispatch, useSelector } from "react-redux";

const cart = () => {

    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    
    return (

        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>

                    <thead>
                        <tr className={styles.trTitle}>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Extras</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cart.products.map((product) => ( 

                            <tr className={styles.tr} key={product._id}>
                                <td>
                                    <div className={styles.imgcontainer}>
                                        <Image 
                                        src={product.img}
                                        layout="fill"
                                        objectFit="cover"
                                        alt="ee"
                                        />
                                    </div>
                                </td>

                                <td>
                                    <span className={styles.name}>{product.title}</span>
                                </td>

                                <td>
                                    <span className={styles.extras}>
                                        {product.Options.map((Option1) => (
                                            <span key={Option1._id}>{Option1.text}, </span>
                                        ))} 
                                    </span>
                                </td>

                                <td>
                                    <span className={styles.price}>£{product.price}</span>
                                </td>
                                
                                <td>
                                    <span className={styles.quantity}>{product.Quantity}</span>
                                </td>

                                <td>
                                    <span className={styles.Total}>${product.price * product.Quantity}</span>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>CART TOTAL</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Subtotal:</b>£6.99
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Discount:</b>£0.00
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b>£6.99
                    </div>
                    <button className={styles.button}>CHECKOUT NOW!</button>

                </div>

            </div>

        </div>

    );
};

export default cart;