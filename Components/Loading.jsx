// Importing the CSS module for styling
import Styles from "../styles/Loading.module.css";

// Functional component 'Loading' for displaying a loading message
const Loading = () => {
    return (
        <div className={Styles.container}>
            {/* Loading message */}
            <h1 className={Styles.loading}>Loading...</h1>
        </div>
    );
};

// Exporting the 'Loading' component
export default Loading;
