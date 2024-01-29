// pages/index.js
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Featured from '../Components/Featured';
import SweetList from '../Components/SweetList';
import axios from 'axios';
import { useState } from 'react';
import AddButton from '../Components/AddButton';
import Add from '../Components/Add';
import CheckOrderButton from '../Components/CheckOrderStatusButton';
import CheckOrder from '../Components/CheckOrder';
import AdminDashboard from "../Components/AdminDashboard";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Loading from '../Components/Loading';

// Default function component for the Home page
export default function Home({ sweetList, admin, orders, user }) {
  // State variables
  const [closeButton, setcloseButton] = useState(true);
  const [close, setclose] = useState(true);
  const [homeSweets, setHomeSweets] = useState(sweetList)
  const token = Cookies.get("AdminToken")
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [index, setIndex] = useState(0);

  // State for the sweet being added
  const [addedSweet, setAddedSweet] = useState({
    title: "",
    desc: "",
    img: null,
    longdesc: "",
    prices: [],
    options: [],
  });

  // Function to resize an image
  const resizeImage = async (image) => {
    // Target dimensions for resizing
    const targetWidth = 1000;
    const targetHeight = 594;

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Resize the image
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          // Convert the canvas to a data URL
          const resizedDataURL = canvas.toDataURL('image/png');

          // Convert data URL to Blob
          fetch(resizedDataURL)
            .then((res) => res.blob())
            .then(resolve)
            .catch(reject);
        };

        img.src = event.target.result;
      };

      reader.readAsDataURL(image);
    });
  };

  // Function to handle the creation of a new sweet
  const handleCreate = async (addedSweet) => {
    try {
      setLoading(true)
      setcloseButton(true)
      
      // Check if an image is selected
      if (addedSweet.img) {
        // Resize the image before uploading
        const resizedImage = await resizeImage(addedSweet.img);

        // Update the addedSweet with the resized image
        setAddedSweet((prevAddedSweet) => ({
          ...prevAddedSweet,
          img: resizedImage,
        }));
      }

      // Upload the image to Cloudinary
      const data = new FormData()
      data.append("file", addedSweet.img)
      data.append("upload_preset", "uploads")

      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dmhtvoflz/image/upload", data)
      const { url } = uploadRes.data
      const newProduct = {
        title: addedSweet.title,
        desc: addedSweet.desc,
        longdesc: addedSweet.longdesc,
        prices: addedSweet.prices,
        options: addedSweet.options,
        img: url
      };
      // Create a new product on the server
      const res = await axios.post("http://localhost:3000/api/products", newProduct, { withCredentials: true })
      if (res.status === 201) {
        // Wait for the server response and then update the local state
        const updatedHomeSweets = [...homeSweets, res.data];
        setHomeSweets(updatedHomeSweets);
        setAddedSweet({
          title: "",
          desc: "",
          img: null,
          longdesc: "",
          prices: [], // Reset prices to an empty array
          options: [],
        });
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  // Function to handle the removal of an extra option
  const handleRemoveExtra = (index) => {
    const extras = addedSweet.options.slice()
    extras.splice(index, 1)
    setAddedSweet({
      ...addedSweet,
      options: extras
    });

  }

  // Function to add an extra option to the sweet
  const handleExtra = () => {
    const { text, price } = addedSweet;

    if (text && price) {
      setAddedSweet((prevAddedSweet) => ({
        ...prevAddedSweet,
        options: [
          ...prevAddedSweet.options,
          { text, price, index: prevAddedSweet.options.length }
        ],
        // Clear the input values after adding the extra item
        text: "",
        price: 0
      }));
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sweets4Every1</title>
        <meta name="description" content="Number one sweet shop" />
        <link rel="icon" href="/img/Browser_icon.png" />
      </Head>
      <Featured />
      {!admin && <CheckOrderButton setclose={setclose} user={user} token={token} />}
      {admin && <AdminDashboard />}
      {admin && <AddButton setcloseButton={setcloseButton} />}
      <SweetList sweetList={homeSweets} />
      {!close && <CheckOrder setclose={setclose} orders={orders} />}
      {!closeButton && <Add setcloseButton={setcloseButton} handleCreate={handleCreate} handleRemoveExtra={handleRemoveExtra} handleExtra={handleExtra} addedSweet={addedSweet} setAddedSweet={setAddedSweet} />}
      {loading && <Loading />}
    </div>
  );
}

// Fetch initial data for the page
export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  try {
    // Fetch product data from the server
    const res = await axios.get("http://localhost:3000/api/products");

    // Fetch user and order data from the server
    const res2 = await axios.get("http://localhost:3000/api/users/[users]", {
      headers: {
        Cookie: `${ctx.req.headers.cookie || ""}; Secure`
      },
    });

    // Fetch additional user data
    const res3 = await axios.get("http://localhost:3000/api/users/username_button", {
      headers: {
        Cookie: `${ctx.req.headers.cookie || ""}; Secure`
      },
    });

    // Check if the user is an admin based on the token
    if (myCookie.adminToken === process.env.TOKEN) {
      admin = true;
    }

    return {
      props: {
        sweetList: res.data,
        admin,
        orders: res2.data.orders,
        user: res3.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        sweetList: [],
        admin,
        orders: [],
      },
    };
  }
};
