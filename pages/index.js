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

export default function Home({ sweetList, admin, orders }) {
  const [closeButton, setcloseButton] = useState(true);
  const [close, setclose] = useState(true);

  console.log("orders:", orders);
  console.log("Admin value:", admin)
  console.log("SweetList:", sweetList)

  return (
    <div className={styles.container}>
      <Head>
        <title>Sweet Shop UK</title>
        <meta name="description" content="Number one sweet shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {!admin && <CheckOrderButton setclose={setclose} />}
      {admin && <AdminDashboard/>}
      {admin && <AddButton setcloseButton={setcloseButton} />}
      <SweetList sweetList={sweetList} />
      {!close && <CheckOrder setclose={setclose} orders={orders} />}
      {!closeButton && <Add setcloseButton={setcloseButton} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  console.log("myCookie:", myCookie)

  try {
    const res = await axios.get("http://localhost:3000/api/products");

    const res2 = await axios.get("http://localhost:3000/api/users/[users]", {
      headers: {
        Cookie: `${ctx.req.headers.cookie || ""}; Secure`
      },
    });

    if (myCookie.adminToken === process.env.TOKEN) {
      admin = true;
    }

    return {
      props: {
        sweetList: res.data,
        admin,
        orders: res2.data.orders,
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
