import styles from "../styles/SweetCard.module.css";
import Image from "next/image";
import Link from "next/link";


const SweetCard = ({sweet}) => {
    return(
        
        <div className={styles.container}>
            <Link href = {`/product/${sweet._id}`} passHref>
            <Image src={sweet.img}  className={styles.img} alt="" width="400" height="250"  />
            </Link>
            <h1 className={styles.title}>{sweet.title}</h1>
            <span className={styles.price}>£{sweet.prices[0]}</span>
            <p className={styles.desc}> {sweet.desc} </p>
        </div>
    );
};

export default SweetCard;