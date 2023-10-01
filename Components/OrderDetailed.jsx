import styles from "../styles/orderDetailed.module.css"
import { useState } from "react"


const OrderDetailed = () => {

    const [customer, setCustomer] = useState("")
    const [address, setAddress] = useState("")


    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Amount to pay after delivery £12.</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Name Surname</label>
                    <input placeholder="jon doe" type="text" className={styles.input} onChange={(e) =>setCustomer(e.target.value)}/>

                </div>
            </div>
        
        </div>
    )
}

export default OrderDetailed