// Importing necessary dependencies and styles
import { useState, useEffect } from "react";
import styles from "../styles/Featured.module.css";
import Image from "next/image";

// Functional component 'Featured' for displaying featured images in a carousel
const Featured = () => {
    // State to manage the current index of the displayed image
    const [index, setIndex] = useState(0);

    // Array of image paths for the carousel
    const images = [
        "/img/Featured3.png",
        "/img/Featured2.png",
        "/img/Featured1.png",
    ];

    // Function to handle left and right arrow clicks to navigate the carousel
    const handleArrow = (direction) => {
        if (direction === "l") {
            setIndex(index !== 0 ? index - 1 : 2);
        }
        if (direction === "r") {
            setIndex(index !== 2 ? index + 1 : 0);
        }
    };

    // useEffect to automatically advance the carousel every 10 seconds
    useEffect(() => {
        const slideInterval = setInterval(() => {
            if (index === 0) {
                setIndex(1);
            } else if (index === 1) {
                setIndex(2);
            } else {
                setIndex(0);
            }
        }, 10000);
        return () => clearInterval(slideInterval);
    }, [index]);

    // Rendering the component with arrow buttons and the carousel
    return (
        <div className={styles.container}>
            {/* Right arrow button */}
            <div className={styles.arrowContainer} style={{ right: 0 }} onClick={() => handleArrow("r")}>
                <Image src="/img/right-arrow.png" alt="right arrow" layout="fill" objectFit="contain" />
            </div>

            {/* Main wrapper for the desktop carousel */}
            <div className={styles.wrapper} style={{ transform: `translateX(${-100 * index}vw)` }}>
                {images.map((img, i) => (
                    <div className={styles.imgContainer} key={i}>
                        <Image src={img} alt="sweets" layout="fill" objectFit="contain" />
                    </div>
                ))}
            </div>

            {/* Wrapper for the mobile version of the carousel */}
            <div className={styles.wrapperphone} style={{ transform: `translateX(${-200 * index}vw)` }}>
                {images.map((img, i) => (
                    <div className={styles.imgContainerPhone} key={i}>
                        <Image src={img} alt="sweets" layout="fill" objectFit="contain" />
                    </div>
                ))}
            </div>

            {/* Left arrow button */}
            <div className={styles.arrowContainer} style={{ left: 0 }} onClick={() => handleArrow("l")}>
                <Image src="/img/left-arrow.png" layout="fill" alt="left arrow" objectFit="contain" />
            </div>
        </div>
    );
};

// Exporting the 'Featured' component
export default Featured;
