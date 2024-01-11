import styles from "../styles/CheckOrder2.module.css"

const CheckOrder2 = () => {
    return(
        <div className={styles.container}>
            <p className={styles.msg} style={{marginRight: "250px"}}>It seems you have not made an order, try having a look at our menu. Happy Shoppping</p>
        </div>
    )
}

export default CheckOrder2