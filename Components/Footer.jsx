// Importing necessary dependencies and styles
import styles from "../styles/Footer.module.css";
import Image from "next/image";

// Functional component 'Footer' for displaying contact and location information
const Footer = () => {
    return (
        <div className={styles.container}>
            {/* Background image for the footer */}
            <div className={styles.item}>
                <Image src="/img/FooterBackground.jpg" alt="background" objectFit="cover" layout="fill" />
            </div>

            {/* Card section containing motto, shop locations, and working hours */}
            <div className={styles.item}>
                {/* Card with the shop motto */}
                <div className={styles.card}>
                    <h2 className={styles.motto}>
                        Indulge in our confectionery wonderland, where sugar reigns supreme and taste buds do a happy dance.
                    </h2>
                </div>

                {/* Card with shop locations */}
                <div className={styles.card}>
                    <h1 className={styles.title}>FIND OUR SHOP</h1>
                    <p className={styles.text}>
                        12 Primrose Avenue, London
                        <br /> N12 9AB
                        <br /> Area Code: 020 8
                    </p>
                    <p className={styles.text}>
                        45 Maple Street, London
                        <br /> SE1 7XYZ
                        <br /> Area Code: 020 7
                    </p>
                    <p className={styles.text}>
                        78 Rosemary Lane, London
                        <br /> London SW3 5LMN
                        <br /> Area Code: 020 7
                    </p>
                    <p className={styles.text}>
                        41 Carterhatch Lane, London
                        <br /> London EN1 9DSQ
                        <br /> Area Code: 020 5
                    </p>
                </div>

                {/* Card with working hours information */}
                <div className={styles.card}>
                    <h1 className={styles.title}>WORKING HOURS</h1>
                    <p className={styles.text}>
                        MONDAY UNTIL FRIDAY
                        <br /> 9:00 - 22:00
                    </p>
                    <p className={styles.text}>
                        SATURDAY - SUNDAY
                        <br /> 12:00 - 24:00
                    </p>
                </div>
            </div>
        </div>
    );
};

// Exporting the 'Footer' component
export default Footer;
