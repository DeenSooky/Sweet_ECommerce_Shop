// Importing the CSS module for styling
import styles from "../styles/Add.module.css"

// Functional component 'AddButton' with destructuring props
const AddButton = ({setcloseButton}) => {
    return (
        // Clickable div serving as an "Add New Sweet" button
        <div onClick={() => setcloseButton(false)} className={styles.mainAddButton} style={{marginLeft: "30px"}}>
            Add New Sweet
        </div>
    )
}

// Exporting the 'AddButton' component
export default AddButton;
