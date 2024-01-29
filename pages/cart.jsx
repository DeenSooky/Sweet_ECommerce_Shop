// Import necessary dependencies
import styles from "../styles/Cart.module.css";
import Head from 'next/head';
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset, deleteProduct } from "../redux/cartSlice.js";
import OrderDetailed from "../Components/OrderDetailed.jsx";

// Cart component
const Cart = () => {
    // Redux state and dispatch
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [cash, setCash] = useState(false);
    const amount = cart.total;
    const currency = "GBP";
    const style = { layout: "vertical" };
    const [cartError, setCartError] = useState(false);

    // Delete product from the cart
    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    // Create order logic
    const createOrder = async (data) => {
        try {
            const res = await axios.post("http://localhost:3000/api/orders", data);
            if (res.status === 201) {
                dispatch(reset());
                router.push(`/Orders/${res.data._id}`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Custom component to wrap the PayPalButtons and show loading spinner
    const ButtonWrapper = ({ currency, showSpinner }) => {
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);

        return (
            <>
                {showSpinner && isPending && <div className="spinner" />}
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function (details) {
                            const shipping = details.purchase_units[0].shipping;
                            createOrder({
                                customer: shipping.name.full_name,
                                address: shipping.address.address_line_1,
                                total: cart.total,
                                method: 1,
                            });
                        });
                    }}
                />
            </>
        );
    };

    // Check cart and show checkout options
    const handleCheckCart = async (quan) => {
        if (quan > 0) {
            setOpen(true);
        } else {
            setCartError(true);
            setTimeout(() => {
                setCartError(false);
            }, 8000);
        }
    }

    // Return the UI of the Cart component
    return (
        <div className={styles.container}>
            <Head>
                <title>Sweets4Every1</title>
                <meta name="description" content="Number one sweet shop" />
                <link rel="icon" href="/img/Browser_icon.png" />
            </Head>
            <div className={styles.left}>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Extras</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </tbody>
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
                                        {product.options.map((Option1) => (
                                            <p key={Option1._id}>
                                                {Option1.text}
                                                {Option1.text === "Personal Message" && product.PersonalMessage && (
                                                    <span className={styles.PersonalMessage}>
                                                        : {product.PersonalMessage}
                                                    </span>
                                                )}
                                            </p>
                                        ))}
                                    </span>
                                </td>
                                <td>
                                    <span className={styles.price}>£{product.price}</span>
                                </td>
                                <td>
                                    <span className={styles.quantity}>{product.quantity}</span>
                                </td>
                                <td>
                                    <span className={styles.Total}>£{(product.price * product.quantity).toFixed(2)}</span>
                                </td>
                                <td>
                                    <Image className={styles.bin} src="/img/delete.png" width={30} height={30} onClick={() => handleDelete(product._id)} />
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
                        <b className={styles.totalTextTitle}>Subtotal:</b>£{cart.total.toFixed(2)}
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Discount:</b>£0.00
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b>£{cart.total.toFixed(2)}
                    </div>
                    {open ? (
                        <div className={styles.paymetnMethods}>
                            <button className={styles.payButton} onClick={() => setCash(true)}>CASH ON DELIVERY</button>
                            <PayPalScriptProvider options={{ clientId: "Af_z8ide5nzVJl0xnUwX9VTXc8AByrX51yjtlv90SnU7iyAQsOKRM25Ul0ITFtnPeuxScsJ5TAb4Ajed", currency: "GBP", intent: "capture", "disableFunding": "credit,card", "enableFunding": "venmo" }} deferLoading={true}>
                                <ButtonWrapper currency={currency} showSpinner={true} />
                            </PayPalScriptProvider>
                        </div>
                    ) : (
                        <button className={styles.button} onClick={() => handleCheckCart(cart.quantity)}>CHECKOUT NOW!</button>
                    )}
                    {cartError && <p className={styles.checkOutError}>Please add items to your cart</p>}
                </div>
            </div>
            {cash && <OrderDetailed total={cart.total} createOrder={createOrder} onCancel={() => setCash(false)} />}
        </div>
    );
};

// Export the Cart component as the default export
export default Cart;
