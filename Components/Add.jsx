import { useState } from "react"
import styles from "../styles/Add.module.css"
import axios from "axios"
import { useRouter } from "next/router" 

const Add = ({setcloseButton}) => {  

    const [file,setfile] =useState(null)
    const [title, setTitle] =useState(null)
    const [desc, setDesc] =useState(null)
    const [longdesc, setlongDesc] =useState(null)
    const [prices, setPrices] =useState([])
    const [options, setoptions] = useState([])
    const [extra, setExtra] = useState(null)


    const changePrice = (e, index) => {
        const currentPrices = prices
        currentPrices[index] = e.target.value
        setPrices(currentPrices);
    }


    const handleExtraInput = (e) => {
        setExtra({...extra, [e.target.name]: e.target.value})
    }

    const handleExtra = () => {
        setoptions((prev) => [...prev, extra])
        document.querySelector('input[name="text"]').value = '';
        document.querySelector('input[name="price"]').value = 0;
    }

    const handleRemoveExtra = (index) => {
        const extras = options.slice()
        extras.splice(index, 1)
        setoptions(extras)
    }

    const handleCreate = async () => {
        const data = new FormData()
        data.append("file", file)   
        data.append("upload_preset", "uploads")            
        try{
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dmhtvoflz/image/upload", data)
            console.log(data) 
            const {url} = uploadRes.data
            const newProduct = {title, desc, longdesc, prices, options, img: url}
            console.log(newProduct)
            await axios.post("http://localhost:3000/api/products", newProduct)
            setcloseButton(true)
        }catch(err){
            console.log(err)
        }

    }

    return (
        <div className={styles.container}> 
            <div className={styles.wrapper}>
                <span onClick={() => setcloseButton(true)} className={styles.close}>X</span>
                <h1>Add a new sweet</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Choose an image</label>
                    <input type="file" onChange={(e) => setfile(e.target.files[0])}/>
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Title</label>
                    <input className={styles.input} type="text" onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Featured Description</label>
                    <textarea rows={2} type ="text" onChange={(e) => setDesc(e.target.value)} />
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Product Description</label>
                    <textarea rows={20} type ="text" onChange={(e) => setlongDesc(e.target.value)} />
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Prices</label>
                    <div className={styles.priceContainer}>
                        <input  type="number" placeholder="Small" min={0} onChange={(e) => changePrice(e, 0)} className={`${styles.input} ${styles.inputSmall}`} />
                        <input  type="number" placeholder="Medium" min={0} onChange={(e) => changePrice(e, 1)} className={`${styles.input} ${styles.inputSmall}`} />
                        <input  type="number" placeholder="Large" min={0} onChange={(e) => changePrice(e, 2)} className={`${styles.input} ${styles.inputSmall}`} />
                    </div>
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Extra</label>
                    <div className={styles.extra}>
                        <input  type="text" name="text" placeholder="Item" onChange={handleExtraInput} className={`${styles.input} ${styles.inputSmall}`}/>
                        <input  type="number" name="price" placeholder="Price" min={0} onChange={handleExtraInput} className={`${styles.input} ${styles.inputSmall}`} />
                        <button  className= {styles.extraButton} onClick={handleExtra}>Add</button>
                    </div>
                    <div className={styles.extraItems}>
                        {options.map((option, index) => (
                            <div key={index} className={styles.extraItemContainer} >
                                <span key={option.text} className={styles.extraItem}>{option.text}<span className= {styles.extraButtonClose} onClick={() => handleRemoveExtra(index)}>X</span></span>
                            </div>
                        ))}
                    </div>
                </div>

                <button className={styles.addButton} onClick={handleCreate}>
                    Create
                </button>


                
            </div>
        </div>
    )
}

export default Add