// Importing necessary modules and component styles
import styles from "../styles/SweetCard.module.css";
import Image from "next/image";
import Link from "next/link";


// Functional component 'SweetCard'
const SweetCard = ({ sweet }) => {
    // Returning JSX for rendering
    return (
        <div className={styles.container}>
            {/* Link to the individual product page */}
            <Link href={`/product/${sweet._id}`} passHref>
                {/* Image of the sweet */}
                <Image src={sweet.img} className={styles.img} alt="Loading" width={400} height={250} />
            </Link>
            {/* Title of the sweet */}
            <h1 className={styles.title}>{sweet.title}</h1>
            {/* Price of the sweet */}
            <span className={styles.price}>£{sweet.prices[0]}</span>
            {/* Description of the sweet */}
            <p className={styles.desc}>{sweet.desc}</p>
        </div>
    );
};

// Exporting the 'SweetCard' component
export default SweetCard;
