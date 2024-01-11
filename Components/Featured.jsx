import { useState, useEffect } from "react";
import styles from "../styles/Featured.module.css";
import Image from "next/image";

const Featured = () => {

    const[index, setIndex] = useState(0)

    const images = [
        "/img/marshM.png",
        "/img/picknmix.png",
        "/img/JarSweets.png",
    ];

    const handleArrow = (direction) => {
        if(direction=="l"){
            setIndex(index !==0 ? index-1 : 2)
        }
        if(direction=="r"){
            setIndex(index !==2 ? index+1 : 0)
        }
    }

    console.log(index)

    useEffect ( () => {
        const slideInterval = setInterval(() => {
            if(index == 0){
                setIndex(1);
            } else if (index == 1){
                setIndex(2);
            } else{ 
            setIndex(0);
            }
        }, 10000);
        return () => clearInterval(slideInterval);
    }, [index] );

    return (
        <div className={styles.container}>
            <div className={styles.arrowContainer} style={{right:0}} onClick={()=>handleArrow("r")} >
            <Image src="/img/right-arrow.png" alt="right arrow" layout="fill" objectFit="contain"/>
            </div>
            <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
            {images.map((img, i) => (
            <div className={styles.imgContainer} key={i}>
                <Image src = {img} alt="sweets" layout="fill" objectFit="contain"/>
                </div>
            ))}
            </div>
            <div className={styles.wrapperphone} style={{transform:`translateX(${-200*index}vw)`}}>
            {images.map((img, i) => (
            <div className={styles.imgContainerPhone} key={i}>
                <Image src = {img} alt="sweets" layout="fill" objectFit="contain"/>
                </div>
            ))}
            </div>
            <div className={styles.arrowContainer} style={{left:0}} onClick ={()=>handleArrow("l")} >
            <Image src="/img/left-arrow.png" layout="fill" alt="left arrow" objectFit="contain"/>
            </div>
        </div>
    );
};

export default Featured; 









