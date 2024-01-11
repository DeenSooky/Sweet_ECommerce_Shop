import styles from "../styles/Add.module.css"

const AddButton = ({setcloseButton}) => {
    return (
        <div onClick={() => setcloseButton(false)} className={styles.mainAddButton} style={{marginLeft: "30px"}}>
            Add New Sweet
        </div>
        
    )
}

export default AddButton