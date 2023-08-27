import { useState } from "react";
import styles from "../../styles/Product.module.css"
import Image from "next/image";
import axios from "axios";
import {useDispatch} from "react-redux";
import { addProduct} from "@/redux/cartSlice";
import { optimizeFonts } from "@/next.config";



const product = ({sweet}) => {

    const [size,setSize] = useState(0)
    const [price,setPrice] = useState(sweet.prices[0])
    const [Options, setOptions] = useState([])
    const [Quantity,setQuantity] = useState(1)
    const dispatch = useDispatch()
    const [PersonalMessageChecked, setPersonalMessageChecked] = useState(false)
    const [PersonalMessage, setPersonalMessage] = useState('')
    

    const changePrice = (number) => {
        setPrice((prev) => parseFloat((prev + number).toFixed(2)));
    }

    const handleSize = (sizeIndex) => {
        const difference = sweet.prices[sizeIndex] - sweet.prices[size];
        setSize(sizeIndex);
        changePrice(difference);
    }

    const handleChange = (e, option) => {
        const checked = e.target.checked;

        if (option.text === "Personal Message") {
            setPersonalMessageChecked(checked)
        }

        if (checked){
            changePrice(option.price);
            setOptions((prev) => [...prev, option])
        }
        else{
            changePrice(-option.price);
            setOptions(Options.filter((Option1)=>Option1._id !== option._id))
        }
    };

    const handleClick = () => {
      
        dispatch(addProduct({...sweet, Options, price, Quantity,  PersonalMessage}))
  
        setPersonalMessage('')

    }


    return (
        <div className={styles.container}>

            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={sweet.img} alt="mnm"  objectFit="contain" width="600" height="400"/>
                </div>

            </div>

            <div className={styles.right}>
                <h1 className={styles.title}> {sweet.title} </h1>
                <span className={styles.price}>£{price}</span>
                <p className={styles.desc}>
                    Introducing the Chocolate Variety Pack: Indulge in a heavenly assortment of all your favorite chocolates conveniently curated in one delightful package. Our Chocolate Variety Pack is a treasure trove of irresistible treats, featuring renowned brands like M&M's, Mars, Twix, and Snickers.

                    With this carefully crafted assortment, you can experience the joy of indulging in a delectable selection of chocolates that cater to every craving. Whether you have a soft spot for melt-in-your-mouth M&M's or crave the caramel-infused goodness of a Mars bar, this variety pack has something to satisfy every chocolate lover's palate.

                    <br/>Imagine unwrapping each delectable piece to reveal the rich and velvety chocolate goodness that awaits. From the smooth and creamy texture of Twix to the perfect blend of nougat, caramel, and peanuts in Snickers, every bite is a sensational journey of flavors and textures.</p>

                    <p className={styles.desc}>Our Chocolate Variety Pack is perfect for sharing joyful moments with loved ones or treating yourself to a delightful solo indulgence. It also makes a wonderful gift for birthdays, holidays, or any special occasion, allowing recipients to experience the pure bliss of a diverse chocolate collection.

                    Whether you're hosting a gathering, stocking up your pantry, or simply seeking a well-deserved moment of sweetness, our Chocolate Variety Pack delivers an exceptional chocolate experience. Each piece is meticulously crafted to ensure the highest quality and the ultimate satisfaction.

                <br/>Visit our website and explore the world of chocolate delight with our Chocolate Variety Pack. It's time to elevate your chocolate experience and savor the harmonious blend of iconic flavors that have captured the hearts of chocolate enthusiasts worldwide. Treat yourself or someone special to the joyous medley of M&M's, Mars, Twix, and Snickers, all in one irresistible package.</p>
                
                <h3 className={styles.choose}>Choose which size</h3>
                <div className={styles.sizes}>
                    <div className={styles.size} onClick={() =>handleSize(0)}>
                        <Image src= "/img/sizing.png" layout="fill" alt=""/>
                        <span className={styles.number}>Small</span>
                    </div>
                    <div className={styles.size} onClick={() =>handleSize(1)}>
                        <Image src= "/img/sizing.png" layout="fill" alt=""/>
                        <span className={styles.number}>Medium</span>
                    </div>
                    <div className={styles.size} onClick={() =>handleSize(2)}>
                        <Image src= "/img/sizing.png" layout="fill" alt=""/>
                        <span className={styles.number}>large</span>
                    </div>

                </div>

                <h3 className={styles.choose}>Add ons?</h3>
                <div className={styles.options1}>

                    {sweet.options.map( (option) => (

                        <div className={styles.option} key={option._id}> 
                            <input 
                            type="checkbox" 
                            id={option.text}
                            name={option.text} 
                            className={styles.checkbox}
                            onChange = {(e)=>handleChange(e, option)}
                            />
                            <label htmlFor={option.text}>{option.text}</label>
                            {PersonalMessageChecked && option.text === "Personal Message" && (
                                <textarea 
                                className={styles.textarea}
                                value={PersonalMessage}
                                onChange={(e) => setPersonalMessage(e.target.value)}
                                placeholder="Enter your personal message..."
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles.add}>
                <input onChange={(e) => setQuantity(parseInt(e.target.value))} type="number" defaultValue={1} className={styles.quantity} min={0}/>
                <button className={styles.button} onClick={handleClick}>Add to cart</button>
                </div>
            </div>  
            
        </div>
    );
};

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
    return{
    props: {
        sweet: res.data,
    }
    }
};

export default product;