// Import styles and necessary components
import styles from "../../styles/TreatList.module.css";
import Product from "../product/[id]";
import axios from "axios";

// TreatList component to display the menu of sweet treats
const TreatList = ({ menu }) => {
  return (
    <div className={styles.container}>
      {/* Title and introduction */}
      <h1 className={styles.title}>Today's TreatList</h1>
      <span className={styles.intro}>
        <p>
          Indulge your senses in a symphony of sweetness as you explore the delectable world of Sweets4Every1. Our menu is a delightful journey through an array of handcrafted confections that promise to satisfy your sweetest cravings.
          Take a peek at our offerings, where luscious chocolates, melt-in-your-mouth pastries, and mouthwatering candies await to dance on your taste buds. Whether you're a devoted dessert enthusiast or simply seeking a moment of bliss, Sweets4Every1 is here to sweeten your day.
        </p>
      </span>

      {/* Mapping through the menu to display each product */}
      {menu.map((product) => (
        <Product key={product._id} sweet={product} className={styles.card} />
      ))}
    </div>
  );
};

export default TreatList;

// Server-side props to fetch the product data from the API
export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      menu: res.data,
    },
  };
};
