// Importing necessary dependencies and styles
import { useEffect, useState } from "react"
import styles from "../styles/Edit.module.css"

// Functional component 'Edit' for editing an existing sweet
const Edit = ({ product, onSave, onCancel }) => {

    // State for managing the edited product and new extra details
    const [editedProduct, setEditedProduct] = useState({ ...product });
    const [newExtra, setNewExtra] = useState({ text: "", price: 0 });

    // useEffect to update state when the product prop changes
    useEffect(() => {
        setEditedProduct({ ...product });
    }, [product]);

    // Function to handle price changes for different sizes
    const changePrice = (e, index) => {
        setEditedProduct(prevState => {
            const updatedPrices = [...prevState.prices];
            const inputValue = e.target.value.trim(); // Trim leading/trailing whitespace
            updatedPrices[index] = inputValue === "" ? "" : Number(inputValue);
            return { ...prevState, prices: updatedPrices };
        });
    };

    // Function to handle input changes for new extra details
    const handleExtraInput = (e) => {
        setNewExtra({
            ...newExtra,
            [e.target.name]: e.target.value,
        });
    };

    // Function to add a new extra to the product
    const handleAddExtra = () => {
        if (newExtra.text && newExtra.price >= 0) {
            const updatedOptions = [...editedProduct.options, newExtra];
            setEditedProduct({ ...editedProduct, options: updatedOptions });

            // Clear the input fields for the new extra
            setNewExtra({ text: "", price: 0 });
        }
    };

    // Function to remove an extra based on its index
    const handleRemoveExtra = (index) => {
        const extras = editedProduct.options.slice();
        extras.splice(index, 1);
        setEditedProduct({ ...editedProduct, options: extras });
    };

    // Rendering the component with input fields and buttons for editing
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* Close button to cancel the editing */}
                <span onClick={onCancel} className={styles.close}>X</span>
                <h1>Edit an existing sweet</h1>

                {/* Input field for choosing an image */}
                <div className={styles.item}>
                    <label className={styles.label}>Choose an image</label>
                    <input type="file" onChange={(e) => setEditedProduct({ ...editedProduct, files: e.target.files[0] })} />
                </div>

                {/* Input field for the title of the sweet */}
                <div className={styles.item}>
                    <label className={styles.label}>Title</label>
                    <input className={styles.input} type="text" value={editedProduct.title} onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })} />
                </div>

                {/* Textarea for the featured description of the sweet */}
                <div className={styles.item}>
                    <label className={styles.label}>Featured Description</label>
                    <textarea rows={2} type="text" value={editedProduct.desc} onChange={(e) => setEditedProduct({ ...editedProduct, desc: e.target.value })} />
                </div>

                {/* Textarea for the product description of the sweet */}
                <div className={styles.item}>
                    <label className={styles.label}>Product Description</label>
                    <textarea rows={20} type="text" value={editedProduct.longdesc} onChange={(e) => setEditedProduct({ ...editedProduct, longdesc: e.target.value })} />
                </div>

                {/* Input fields for different sizes and their prices */}
                <div className={styles.item}>
                    <label className={styles.label}>Prices</label>
                    <div className={styles.priceContainer}>
                        <input type="number" placeholder="Small" min={0} value={editedProduct.prices[0]} onChange={(e) => changePrice(e, 0)} className={`${styles.input} ${styles.inputSmall}`} />
                        <input type="number" placeholder="Medium" min={0} value={editedProduct.prices[1]} onChange={(e) => changePrice(e, 1)} className={`${styles.input} ${styles.inputSmall}`} />
                        <input type="number" placeholder="Large" min={0} value={editedProduct.prices[2]} onChange={(e) => changePrice(e, 2)} className={`${styles.input} ${styles.inputSmall}`} />
                    </div>
                </div>

                {/* Input fields and button for adding a new extra to the sweet */}
                <div className={styles.item}>
                    <label className={styles.label}>Extra</label>
                    <div className={styles.extra}>
                        <input type="text" name="text" placeholder="Item" value={newExtra.text} onChange={handleExtraInput} className={`${styles.input} ${styles.inputSmall}`} />
                        <input type="number" name="price" placeholder="Price" value={newExtra.price} min={0} onChange={handleExtraInput} className={`${styles.input} ${styles.inputSmall}`} />
                        <button className={styles.extraButton} onClick={handleAddExtra}>Add</button>
                    </div>

                    {/* Displaying the list of extras with remove buttons */}
                    <div className={styles.extraItems}>
                        {editedProduct.options.map((option, index) => (
                            <div key={index} className={styles.extraItemContainer}>
                                <span className={styles.extraItem}>{option.text} <span className={styles.extraButtonClose} onClick={() => handleRemoveExtra(index)}>X</span></span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Button to save the edited sweet */}
                <button className={styles.addButton} onClick={() => onSave(editedProduct)}>
                    Save
                </button>
            </div>
        </div>
    );
}

// Exporting the 'Edit' component
export default Edit;
