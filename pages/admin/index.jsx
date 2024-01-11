import styles from "../../styles/Admin.module.css"
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import Edit from "../../Components/Edit";



const Index = ({orders, products}) => {

    const [sweetList, setsweetList] = useState(products)
    const [orderList, setorderList] = useState(orders)
    const [productList, setproductList] = useState(products)
    const status = ["Prepairing", "On the way", "Delivered"]
    const [SearchQuery, setSearchQuery] = useState("")
    const [editingProduct, setEditingProduct] = useState(null)
    const [showEditForm, setShowEditForm] = useState(false)

    const handleDelete = async (id) => {
        try{
            const res = await axios.delete("http://localhost:3000/api/products/" + id)
            setsweetList(sweetList.filter(sweet => sweet._id !== id ))
        }catch (err){
            console.log(err)
        }
    }

    

    const handleEdit = async (id) => {
       const productToEdit = sweetList.find((product) => product._id === id)
       setEditingProduct(productToEdit)
       setShowEditForm(true)
    }

    
    const handleSaveProduct = async (updatedProduct) => {
        console.log(updatedProduct);
        try {
          // Send an update request to the server with the updated product
          const res = await axios.put(
            `http://localhost:3000/api/products/${updatedProduct._id}`,
            updatedProduct,
          );
          console.log(res.status)
      
          // Check if the update was successful on the server
          if (res.status === 201) {
            // If the update is successful, update the product list with the updated product
            const updatedProducts = sweetList.map((product) =>
              product._id === updatedProduct._id ? updatedProduct : product
            );
            setsweetList(updatedProducts);
            setShowEditForm(false); // Close the edit form.
          } else {
            console.log("Update failed: ", res.data); // Handle error cases
          }
        } catch (err) {
          console.log(err.response.data); // Handle any errors that may occur during the update
        }
    };

    const cancelEdit = () => {
        setShowEditForm(false); // Close the edit form.
    };

    const handleStatus = async (id) => {
        
        const item = orderList.filter(order => order._id === id)[0]
        const currentStatus = item.status

        if (currentStatus === 2){
            return 
        }
        
        try{
        const res = await axios.put("http://localhost:3000/api/orders/" + id, {status: currentStatus+1})
        setorderList([
            res.data,
            ...orderList.filter((order) => order._id !== id)
        ])
        }catch (err){
            console.log(err)
        }
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase().trim();
        setSearchQuery(query);
        const filteredOrders = orders.filter((order) =>
          (order._id && order._id.toLowerCase().includes(query)) || 
          (order.customer && order.customer.toLowerCase().includes(query))
        );
        setorderList(filteredOrders);
    };

    const handleSearchProduct = (e) => {
        const query = e.target.value.toLowerCase().trim();
        setSearchQuery(query);
        console.log('Search Query:', query);
        const filteredproducts = products.filter((product) =>
          product.title && product.title.toLowerCase().includes(query)
        );
        console.log('Filtered Products:', filteredproducts);
        setproductList(filteredproducts);
    };
      

    return(
        <div className={styles.container}>
            <div className={styles.item}>
                <h1 className={styles.title}>Products</h1>
                <input type="text" placeholder="Search by title..." onChange={handleSearchProduct} className={styles.searchBar} />
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.Title}>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </tbody>
                    {productList.map((product) => (
                        <tbody key={product._id}>
                            <tr className={styles.Title}>
                                <td>
                                    <Image
                                    src = {product.img}
                                    width = {80}
                                    height = {80}
                                    objectFit = "cover"
                                    alt = ""
                                    className= {styles.img}
                                    />
                                </td>
                                <td>{product._id}</td>
                                <td>{product.title}</td>
                                <td>£{product.prices[0]}</td>
                                <td>
                                    <button className={styles.button} onClick={() =>handleEdit(product._id)}>Edit</button>
                                    <button className={styles.button} onClick={()=>handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                    {showEditForm && editingProduct && ( <Edit product={editingProduct} onSave={(updatedProduct) => handleSaveProduct(updatedProduct)} onCancel={() => cancelEdit()}/>)}
                </table>
            </div>
            <div className={styles.item}>
                <h1 className={styles.title}>Orders</h1>
                <input type="text" placeholder="Search by Id or Customer..." onChange={handleSearch} className={styles.searchBar} />
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.Title}>
                            <th>Id</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </tbody>

                    {orderList.map((orders) => (
                        <tbody key = {orders._id}>
                            <tr className={styles.Title}>
                                <td>{orders._id}</td>
                                <td>{orders.customer}</td>
                                <td>£{orders.total}</td>
                                <td>{orders.method === 0 ? <span>Cash</span> : <span>Paid</span>}</td>
                                <td>{status[orders.status]}</td>
                                <td>
                                    <button onClick={() => handleStatus(orders._id)} className={styles.button_Orders}>Next Stage</button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>

        </div>
    )
}

export const getServerSideProps = async (ctx) => {

    const myCookie = ctx.req?.cookies || ""
    
    if (myCookie.adminToken !== process.env.TOKEN){
        return{
            redirect:{
                destination: "/admin/login",
                permanent: false
            }
        }
    }

    const productRes = await axios.get("http://localhost:3000/api/products")
    const orderRes = await axios.get("http://localhost:3000/api/orders")

    return {
        props:{
            orders: orderRes.data,
            products: productRes.data
        }
    }
}

export default Index