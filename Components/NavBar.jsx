// Importing necessary modules and components
import styles from "../styles/NavBar.module.css";
import Image from "next/image";
import { FaBars, FaHome, FaStar, FaBlog, FaFileContract } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Cookies from "js-cookie";

// Functional component 'NavBar'
const NavBar = () => {
    // State for controlling the visibility of the sidebar menu
    const [MenuOpen, setMenuOpen] = useState(true);

    // Retrieving user and admin tokens from cookies
    const token = Cookies.get("token") || null;
    const adminToken = Cookies.get("adminToken") || null;

    // Function to delete cookies on logout
    const handleCookieDelete = () => {
        Cookies.remove("token") || Cookies.remove("adminToken");
    };

    // Function to toggle the sidebar menu
    const handleSidebarToggle = () => {
        setMenuOpen(!MenuOpen);
    };

    // Retrieving quantity from the Redux store
    const quantity = useSelector((state) => state.cart.quantity);

    return (
        <div className={styles.container}>
            {/* Section for contact details */}
            <div className={styles.item}>
                <div className={styles.telephone}>
                    <Image src="/img/telephone.png" alt="phone" width="32" height="32" />
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

            {/* Navigation section */}
            <div className={styles.item}>
                <ul className={styles.list}>
                    {/* Navigation links */}
                    <Link href="/" passHref className={styles.listItem}>
                        <li>SweetHub</li>
                    </Link>
                    <Link href="/TreatList" passHref className={styles.listItem}>
                        <li>TreatList</li>
                    </Link>
                    <li className={styles.logo}>
                        <Image src="/img/sweet_shop_logo2.png" alt="logo" width="190" height="85" />
                    </li>
                    <Link href="/blog" style={{ width: "250px", marginLeft: "35px" }} className={styles.listItem} >
                        <li>Sweet Stories</li>
                    </Link>
                    <Link href="/user" className={styles.listItem}>
                        {token || adminToken ? (
                            <li onClick={() => handleCookieDelete()}>Logout</li>
                        ) : (
                            <li>Login/Register</li>
                        )}
                    </Link>
                </ul>
            </div>

            {/* Cart section */}
            <Link href="/cart" passHref>
                <div className={styles.item}>
                    <div className={styles.cart_container}>
                        <Image src="/img/trolley2.png" alt="Trolley" width="60" height="60" />
                        <p className={styles.number}>{quantity}</p>
                    </div>
                </div>
            </Link>

            {/* Logo for mobile view */}
            <div className={styles.LogoPhone}>
                <Image src="/img/sweet_shop_logo2.png" alt="logo" width="190" height="100" />
            </div>

            {/* Bars icon for toggling the sidebar menu */}
            <i className={styles.bars} onClick={handleSidebarToggle}><FaBars /></i>

            {/* Sidebar menu */}
            <div className={`${styles.sidebar_content} ${MenuOpen ? styles.open : ""}`}>
                <ul className={styles.sidebar_container}>
                    {/* Sidebar options */}
                    {!MenuOpen && <li className={styles.nav_option1}>
                        <i className={styles.home}> <FaHome /> </i>
                        <h3>Home</h3>
                    </li>}
                    {!MenuOpen && <li className={styles.nav_option1}>
                        <i className={styles.menu}><FaStar /></i>
                        <h3>Menu</h3>
                    </li>}
                    {!MenuOpen && <li className={styles.nav_option1}>
                        <i className={styles.blog}><FaBlog /></i>
                        <h3>Blog</h3>
                    </li>}
                    {!MenuOpen && <li className={styles.nav_option1}>
                        <i className={styles.contact}><FaFileContract /></i>
                        <h3>Contact</h3>
                    </li>}
                </ul>
            </div>
        </div>
    );
};

// Exporting the 'NavBar' component
export default NavBar;
