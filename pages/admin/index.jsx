import styles from "../../styles/Admin.module.css";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import Edit from "../../Components/Edit";

// Index component for the admin interface
const Index = ({ orders, products }) => {
    // State for managing product and order lists
    const [sweetList, setsweetList] = useState(products);
    const [orderList, setorderList] = useState(orders);
    const [productList, setproductList] = useState(products);

    // Possible order status values
    const status = ["Prepairing", "On the way", "Delivered"];

    // State for managing the editing of a product
    const [editingProduct, setEditingProduct] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);

    // Function to handle the deletion of a product
    const handleDelete = async (id) => {
        try {
            // Make a DELETE request to the server to delete the product
            const res = await axios.delete(`http://localhost:3000/api/products/${id}`);

            if (res.status === 200) {
                // If the deletion is successful, update the product list
                const updatedSweetList = sweetList.filter((sweet) => sweet._id !== id);
                setsweetList(updatedSweetList);
                setproductList(updatedSweetList);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Function to handle the editing of a product
    const handleEdit = async (id) => {
        const productToEdit = sweetList.find((product) => product._id === id);
        setEditingProduct(productToEdit);
        setShowEditForm(true);
    };

    // Function to save the updated product after editing
    const handleSaveProduct = async (updatedProduct) => {
        try {
            // Make a PUT request to the server with the updated product data
            const res = await axios.put(
                `http://localhost:3000/api/products/${updatedProduct._id}`,
                updatedProduct
            );

            if (res.status === 201) {
                // If the update is successful, update the product list and close the edit form
                const updatedProducts = sweetList.map((product) =>
                    product._id === updatedProduct._id ? updatedProduct : product
                );
                setsweetList(updatedProducts);
                setShowEditForm(false);
            } else {
                console.log("Update failed: ", res.data); // Handle error cases
            }
        } catch (err) {
            console.log(err.response.data); // Handle any errors that may occur during the update
        }
    };

    // Function to cancel the editing of a product
    const cancelEdit = () => {
        setShowEditForm(false);
    };

    // Function to handle the advancement of order status
    const handleStatus = async (id) => {
        const item = orderList.filter((order) => order._id === id)[0];
        const currentStatus = item.status;

        if (currentStatus === 2) {
            return;
        }

        try {
            // Make a PUT request to the server to update the order status
            const res = await axios.put(`http://localhost:3000/api/orders/${id}`, {
                status: currentStatus + 1,
            });

            // Update the order list with the updated order status
            setorderList([res.data, ...orderList.filter((order) => order._id !== id)]);
        } catch (err) {
            console.log(err);
        }
    };

    // Function to handle search based on order ID or customer name
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filteredOrders = orders.filter(
            (order) =>
                (order._id && order._id.toLowerCase().includes(query)) ||
                (order.customer && order.customer.toLowerCase().includes(query))
        );
        setorderList(filteredOrders);
    };

    // Function to handle search based on product title
    const handleSearchProduct = (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filteredProducts = products.filter(
            (product) => product.title && product.title.toLowerCase().includes(query)
        );
        setproductList(filteredProducts);
    };

    // JSX structure for the admin interface
    return (
        <div className={styles.container}>
            {/* Product Management Section */}
            <div className={styles.item}>
                <h1 className={styles.title}>Products</h1>
                <input
                    type="text"
                    placeholder="Search by title..."
                    onChange={handleSearchProduct}
                    className={styles.searchBar}
                />
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
                                        src={product.img}
                                        width={80}
                                        height={80}
                                        objectFit="cover"
                                        alt=""
                                        className={styles.img}
                                    />
                                </td>
                                <td>{product._id}</td>
                                <td>{product.title}</td>
                                <td>£{product.prices[0]}</td>
                                <td>
                                    <button
                                        className={styles.button}
                                        onClick={() => handleEdit(product._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={styles.button}
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                    {/* Edit form for products */}
                    {showEditForm && editingProduct && (
                        <Edit
                            product={editingProduct}
                            onSave={(updatedProduct) => handleSaveProduct(updatedProduct)}
                            onCancel={() => cancelEdit()}
                        />
                    )}
                </table>
            </div>

            {/* Order Management Section */}
            <div className={styles.item}>
                <h1 className={styles.title}>Orders</h1>
                <input
                    type="text"
                    placeholder="Search by Id or Customer..."
                    onChange={handleSearch}
                    className={styles.searchBar}
                />
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

                    {orderList.map((order) => (
                        <tbody key={order._id}>
                            <tr className={styles.Title}>
                                <td>{order._id}</td>
                                <td>{order.customer}</td>
                                <td>£{order.total}</td>
                                <td>{order.method === 0 ? <span>Cash</span> : <span>Paid</span>}</td>
                                <td>{status[order.status]}</td>
                                <td>
                                    <button
                                        onClick={() => handleStatus(order._id)}
                                        className={styles.button_Orders}
                                    >
                                        Next Stage
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
};

// Server-side props to ensure authentication and fetch data
export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";

    if (myCookie.adminToken !== process.env.TOKEN) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            },
        };
    }

    // Fetch product and order data from the server
    const productRes = await axios.get("http://localhost:3000/api/products");
    const orderRes = await axios.get("http://localhost:3000/api/orders");

    return {
        props: {
            orders: orderRes.data,
            products: productRes.data,
        },
    };
};

export default Index;
