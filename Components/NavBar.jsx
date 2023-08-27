import styles from "../styles/NavBar.module.css";
import  Image from "next/image";
import {FaBars,FaHome, FaStar, FaBlog, FaFileContract } from "react-icons/fa";
import { useState } from "react";
import {useSelector} from "react-redux";
import Link from "next/link";

const NavBar = () => {
    const[MenuOpen, setMenuOpen] = useState(true);

    const handleSidebarToggle = () => {
        setMenuOpen(!MenuOpen);
    };

    const quantity = useSelector((state) => state.cart.quantity)
    
    return(
    <div className={styles.container}>
        <div className={styles.item}>
            <div className={styles.telephone}>
                <Image src="/img/telephone.png" alt="phone" width="32" height="32"/>
            </div>
            <div className={styles.texts}>
                <div className={styles.text}>
                    <p> <b>ORDER NOW</b></p>
                </div>
                <div className={styles.text}>
                    <p>04554354387</p>
                </div>
            </div>
        </div>
        <div className={styles.item}>
            <div className={styles.list}>
                <div className={styles.listItem}>Home</div>
                <div className={styles.listItem}>Menu</div>
                <div className={styles.logo}>
                <Image src="/img/sweet_shop_logo2.png" alt="logo" width="190" height="85"/> 
                </div>
                <div className={styles.listItem}>Blog</div>
                <div className={styles.listItem}>Contact</div>
            </div>
        </div>
        <Link href = "/cart" passHref> 
            <div className={styles.item}>
                <div className={styles.cart_container}>
                    <div className={styles.trolley}>
                        <Image src="/img/trolley2.png" alt="Trolley" width="60" height="60" />
                    </div>
                    <div className={styles.CartNumber}>
                        <p className={styles.number}>{quantity}</p>
                    </div>
                </div>
            </div>
        </Link>

        <div className={styles.LogoPhone}>
            <Image src="/img/sweet_shop_logo2.png" alt="logo" width="190" height="100"/>
        </div>

        <i className={styles.bars} onClick={handleSidebarToggle}><FaBars/></i>

        <div className={`${styles.sidebar_content} ${MenuOpen ? styles.open : ""}`}>
            <ul className={styles.sidebar_container}>


                {!MenuOpen &&<li className={styles.nav_option1}>
                    <i className={styles.home}> <FaHome/> </i>
                    <h3>Home</h3>
                </li>}

                {!MenuOpen &&<li className={styles.nav_option1}>
                    <i className={styles.menu}><FaStar/></i>
                    <h3>Menu</h3>
                </li>}

                {!MenuOpen &&<li className={styles.nav_option1}>
                    <i className={styles.blog}><FaBlog/></i>
                    <h3>Blog</h3>
                </li>}

                {!MenuOpen &&<li className={styles.nav_option1}>
                    <i className={styles.contact}><FaFileContract/></i>
                    <h3>Contact</h3>
                </li>} 
            </ul>
        </div>
    </div>
    );
};

export default NavBar;