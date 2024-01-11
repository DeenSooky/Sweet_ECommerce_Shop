import styles from "../styles/orderDetailed.module.css"
import { useState } from "react"


const OrderDetailed = ({total, createOrder, onCancel}) => {

    const [customer, setCustomer] = useState("")
    const [address, setAddress] = useState("")

    const handleClick = () => {
        createOrder({customer,address,total,method: 0})
    }


    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span onClick={onCancel} className={styles.close}>X</span>
                <h1 className={styles.title}>Amount to pay after delivery £12.</h1>

                <div className={styles.item}>
                    <label className={styles.label}>Name Surname</label>
                    <input placeholder="jon doe" type="text" className={styles.input} onChange={(e) =>setCustomer(e.target.value)}/>
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Phone Number</label>
                    <input type="text" placeholder="+44 7548294734" className={styles.input}/>
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Address</label>
                    <textarea rows={5} placeholder="148 baggot street, BM3 5NG" type="text" className={styles.textarea} onChange={(e) => setAddress(e.target.value)}/>
                </div>

                <button className={styles.button} onClick={handleClick}>Order</button>
            </div>
        
        </div>
    )
}

export default OrderDetailed