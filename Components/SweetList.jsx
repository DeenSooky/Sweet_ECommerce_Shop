// Importing necessary modules and component styles
import styles from "../styles/SweetList.module.css";
import SweetCard from "./SweetCard";

// Functional component 'SweetList'
const SweetList = ({ sweetList }) => {
    // Returning JSX for rendering
    return (
        <div className={styles.container}>
            {/* Heading for the sweet list */}
            <h1 className={styles.title}>THE BEST SWEETS IN THE UK</h1>
            {/* Description of the sweet shop */}
            <p className={styles.desc}>
                Welcome to Sweet Shop UK, where sweetness meets delight! We are a premier destination for all your sugary cravings and confectionery dreams. Indulge in our delectable assortment of handcrafted chocolates, scrumptious pastries, and irresistible candies.
                With a wide range of flavors and textures, each treat is a little piece of heaven. Our passionate team of confectioners pours love and creativity into every creation, ensuring a delightful experience for every sweet tooth.
                Whether you are celebrating a special occasion, searching for a perfect gift, or simply treating yourself, our Sweet Shop is here to make every moment a little sweeter.
                Visit us today and let the magic of sugar enchant your taste buds!
            </p>
            {/* Wrapper for displaying individual sweet cards */}
            <div className={styles.wrapper}>
                {/* Mapping through the sweetList and rendering 'SweetCard' component for each sweet */}
                {sweetList.map((sweet) => (
                    <SweetCard key={sweet._id} sweet={sweet} />
                ))}
            </div>
        </div>
    );
};

// Exporting the 'SweetList' component
export default SweetList;
