import React from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import { useState } from "react";
import styles from "../styles/DropDownProfile.module.css"


const DropDownProfile = () => {

    const[isMenuOpen, SetisMenuOpen] = useState(false);

    const openMenu = () => {
        SetisMenuOpen(true);
    };

    const closeMenu = () => {
        SetisMenuOpen(false);
    };

    return(
        <div className={styles.itemPhone}>
        <ul className={styles.listphone} style={{right: isMenuOpen ? '0' : '-200px'}}>
            <i className={styles.cross} onClick={closeMenu} > <FaTimes/> </i>
            <li className={styles.listItemPhone}>Homepage</li>
            <li className={styles.listItemPhone}>Products</li>
            <li className={styles.listItemPhone}>Menu</li>
            <li className={styles.listItemPhone}>Events</li>
            <li className={styles.listItemPhone}>Blog</li>
            <li className={styles.listItemPhone}>Contact</li>
        </ul>
        <i className={styles.bars}  onClick={openMenu} > <FaBars/> </i>
    </div>
    );
};

export default DropDownProfile;