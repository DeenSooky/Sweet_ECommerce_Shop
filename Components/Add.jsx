// Importing the CSS module for styling
import styles from "../styles/Add.module.css"

// Functional component 'Add' with destructuring props
const Add = ({setcloseButton, handleRemoveExtra, handleCreate, handleExtra, addedSweet, setAddedSweet }) => {  

    return (
        // Main container for the 'Add' component
        <div className={styles.container}> 
            <div className={styles.wrapper}>
                {/* Close button to set closeButton state to true */}
                <span onClick={() => setcloseButton(true)} className={styles.close}>X</span>

                {/* Heading for the 'Add' form */}
                <h1>Add a new sweet</h1>

                {/* File input for choosing an image */}
                <div className={styles.item}>
                    <label className={styles.label}>Choose an image</label>
                    <input type="file" onChange={(e) => setAddedSweet({...addedSweet, img: e.target.files[0]})}/>
                </div>

                {/* Input for the title of the sweet */}
                <div className={styles.item}>
                    <label className={styles.label}>Title</label>
                    <input className={styles.input} type="text" value={addedSweet.title} onChange={(e) => setAddedSweet({...addedSweet, title: e.target.value})}/>
                </div>

                {/* Textarea for the featured description of the sweet */}
                <div className={styles.item}>
                    <label className={styles.label}>Featured Description</label>
                    <textarea rows={3} type ="text" value={addedSweet.desc} onChange={(e) => setAddedSweet({...addedSweet, desc: e.target.value})} />
                </div>

                {/* Textarea for the product description of the sweet */}
                <div className={styles.item}>
                    <label className={styles.label}>Product Description</label>
                    <textarea rows={20} type ="text" value={addedSweet.longdesc} onChange={(e) => setAddedSweet({...addedSweet, longdesc: e.target.value})} />
                </div>

                {/* Input fields for small, medium, and large prices */}
                <div className={styles.item}>
                    <label className={styles.label}>Prices</label>
                    <div className={styles.priceContainer}>
                        <input  type="number" placeholder="Small" value={addedSweet.prices[0]} min={0} onChange={(e) => setAddedSweet({...addedSweet, prices:  [e.target.value, addedSweet.prices[1], addedSweet.prices[2]]})} className={`${styles.input} ${styles.inputSmall}`} />
                        <input  type="number" placeholder="Medium" value={addedSweet.prices[1]} min={0} onChange={(e) => setAddedSweet({...addedSweet, prices: [addedSweet.prices[0], e.target.value, addedSweet.prices[2]]})} className={`${styles.input} ${styles.inputSmall}`} />
                        <input  type="number" placeholder="Large" value={addedSweet.prices[2]} min={0} onChange={(e) => setAddedSweet({...addedSweet, prices:  [addedSweet.prices[0], addedSweet.prices[1], e.target.value]})} className={`${styles.input} ${styles.inputSmall}`} />
                    </div>
                </div>

                {/* Input fields for extra items with add and remove buttons */}
                <div className={styles.item}>
                    <label className={styles.label}>Extra</label>
                    <div className={styles.extra}>
                        <input  type="text" name="text" placeholder="Item" value={addedSweet.text} onChange={(e) => setAddedSweet({...addedSweet, text: e.target.value })} className={`${styles.input} ${styles.inputSmall}`}/>
                        <input  type="number" name="price" placeholder="Price" value={addedSweet.price} min={0} onChange={(e) => setAddedSweet({...addedSweet, price: e.target.value})} className={`${styles.input} ${styles.inputSmall}`} />
                        <button  className= {styles.extraButton} onClick={() => handleExtra(addedSweet.options.length)}>Add</button>
                    </div>
                    {/* Displaying added extra items with remove button */}
                    <div className={styles.extraItems}>
                        {addedSweet.options.map((option, index) => (
                            <div key={index} className={styles.extraItemContainer} >
                                <span key={option.text} className={styles.extraItem}>{option.text}<span className= {styles.extraButtonClose} onClick={() => handleRemoveExtra(index)}>X</span></span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Button to trigger the 'handleCreate' function */}
                <button className={styles.addButton} onClick={() => handleCreate({... addedSweet, _id: addedSweet._id})}>
                    Create
                </button>
            </div>
        </div>
    )
}

// Exporting the 'Add' component
export default Add
