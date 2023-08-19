import styles from "../styles/Footer.module.css"
import Image from "next/image"

const Footer = () => {
    return(
        <div className={styles.container}>
            <div className={styles.item}>
                <Image src="/img/FooterBackground.jpg" alt="background" objectFit="cover" layout="fill"/>
            </div>

            <div className={styles.item}>
            <div className={styles.card}>
                <h2 className={styles.motto}>
                Indulge in our confectionery wonderland, where sugar reigns supreme and taste buds do a happy dance.
                 </h2>
            </div>

            <div className={styles.card}>
            <h1 className={styles.title}>
                 FIND OUR SHOP </h1>
                 <p className={styles.text}> 
                 12 Primrose Avenue, London
                <br/> N12 9AB
                <br/> Area Code: 020 8
                </p>
                <p className={styles.text}> 
                45 Maple Street, London 
                <br/> SE1 7XYZ
                <br/> Area Code: 020 7
                </p>
                <p className={styles.text}> 
                78 Rosemary Lane, London
                <br/> London SW3 5LMN
                <br/> Area Code: 020 7
                </p>
                <p className={styles.text}> 
                41 Carterhatch Lane, London
                <br/> London EN1 9DSQ
                <br/> Area Code: 020 5
                </p>
            </div>

            <div className={styles.card}>
                <h1 className={styles.title}>WORKING HOURS</h1> 
                <p className={styles.text}>
                    MONDAY UNTIL FRIDAY
                    <br/> 9:00 - 22:00
                </p>
                <p className={styles.text}>
                    SATURDAY - SUNDAY
                    <br/> 12:00 - 24:00
                </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;