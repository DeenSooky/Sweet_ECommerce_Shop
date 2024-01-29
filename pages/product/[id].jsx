// Import necessary libraries and components
import { useState } from "react";
import styles from "../../styles/Product.module.css"
import Image from "next/image";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

// Product component for displaying product details and adding to cart
const Product = ({ sweet }) => {
    // State variables for managing product options and quantity
    const [size, setSize] = useState(0);
    const [price, setPrice] = useState(sweet.prices[0]);
    const [options, setOptions] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const [personalMessageChecked, setPersonalMessageChecked] = useState(false);
    const [personalMessage, setPersonalMessage] = useState('');

    // Function to change the price based on the selected size
    const changePrice = (number) => {
        setPrice((prev) => parseFloat((prev + number).toFixed(2)));
    }

    // Function to handle the selection of product size
    const handleSize = (sizeIndex) => {
        const difference = sweet.prices[sizeIndex] - sweet.prices[size];
        setSize(sizeIndex);
        changePrice(difference);
    }

    // Function to handle changes in checkboxes for product options
    const handleChange = (e, option) => {
        const checked = e.target.checked;

        if (option.text === "Personal Message") {
            setPersonalMessageChecked(checked);
        }

        if (checked) {
            changePrice(option.price);
            setOptions((prev) => [...prev, option]);
        } else {
            changePrice(-option.price);
            setOptions(options.filter((option1) => option1._id !== option._id));
        }
    };

    // Function to handle adding the product to the cart
    const handleClick = () => {
        dispatch(addProduct({ ...sweet, options, price, quantity, personalMessage }));
        setPersonalMessage('');
        setOptions([]);
    }

    return (
        <div className={styles.container}>
            {/* Left side with product image */}
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={sweet.img} alt="mnm" objectFit="contain" width="600" height="400" />
                </div>
            </div>

            {/* Right side with product details and options */}
            <div className={styles.right}>
                <h1 className={styles.title}>{sweet.title}</h1>
                <span className={styles.price}>£{price}</span>
                <p className={styles.desc}>{sweet.longdesc}</p>

                {/* Selecting product size */}
                <h3 className={styles.choose}>Choose the size</h3>
                <div className={styles.sizes}>
                    <div className={styles.size} onClick={() => handleSize(0)}>
                        <Image src="/img/sizing.png" layout="fill" alt="" />
                        <span className={styles.number}>Small</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(1)}>
                        <Image src="/img/sizing.png" layout="fill" alt="" />
                        <span className={styles.number}>Medium</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(2)}>
                        <Image src="/img/sizing.png" layout="fill" alt="" />
                        <span className={styles.number}>Large</span>
                    </div>
                </div>
                {/* Selecting product options */}
                <h3 className={styles.choose}>Add ons?</h3>
                <div className={styles.options1}>
                    {sweet.options.map((option) => (
                        <div className={styles.option} key={option._id}>
                            <input
                                type="checkbox"
                                id={option.text}
                                name={option.text}
                                className={styles.checkbox}
                                onChange={(e) => handleChange(e, option)}
                            />
                            <label htmlFor={option.text}>{option.text}</label>
                            {personalMessageChecked && option.text === "Personal Message" && (
                                <textarea
                                    className={styles.textarea}
                                    value={personalMessage}
                                    onChange={(e) => setPersonalMessage(e.target.value)}
                                    placeholder="Enter your personal message..."
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Adding to cart */}
                <div className={styles.add}>
                    <input
                        onChange={(e) => setQuantity(e.target.value)}
                        type="number"
                        defaultValue={1}
                        className={styles.quantity}
                        min={0}
                    />
                    <button className={styles.button} onClick={handleClick}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

// Server-side props to fetch product data based on the provided ID
export const getServerSideProps = async ({ params }) => {
    const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
    return {
        props: {
            sweet: res.data,
        }
    };
};

export default Product;
