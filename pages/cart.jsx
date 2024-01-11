import styles from "../styles/Cart.module.css";
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
import { reset } from "../redux/cartSlice.js";
import OrderDetailed from "../Components/OrderDetailed.jsx";
import dynamic from "next/dynamic.js";



const Cart = () => {

    const cart = useSelector((state) => state.cart)
    const [open, setOpen] = useState(false)
    const [cash, setCash] = useState(false)
    const amount = cart.total
    const currency = "GBP"
    const style = {layout:"vertical"}
    const dispatch = useDispatch()
    const router = useRouter()

    // Create order logic from the first code snippet
    const createOrder = async (data) => {
        try{
            const res = await axios.post("http://localhost:3000/api/orders", data, {withCredentials: true})
            if (res.status === 201) {
                router.push(`/Orders/${res.data._id}`);
                dispatch(reset())
            }
        }catch (err){
            console.log(err)
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
                                    }
                                }
                            ]
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
        
    return (
        <div className={styles.container}>
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
                                        {product.Options.map((Option1) => (
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
                                    <span className={styles.quantity}>{product.Quantity}</span>
                                </td>

                                <td>
                                    <span className={styles.Total}>£{(product.price * product.Quantity).toFixed(2)}</span>
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
                        <PayPalScriptProvider options={{ clientId: "Af_z8ide5nzVJl0xnUwX9VTXc8AByrX51yjtlv90SnU7iyAQsOKRM25Ul0ITFtnPeuxScsJ5TAb4Ajed", currency: "GBP", intent: "capture", "disableFunding": "credit,card", "enableFunding": "venmo" }} deferLoading = {true}>
                             <ButtonWrapper currency={currency} showSpinner={false} />
                        </PayPalScriptProvider>
                    </div>) : 
                    (
                        <button className={styles.button} onClick={()=>setOpen(true)}>CHECKOUT NOW!</button>
                    )}
                </div>
            </div>
            {cash && <OrderDetailed total={cart.total} createOrder={createOrder} onCancel={() => setCash(false)} />}
        </div>
    );
};

export default Cart;