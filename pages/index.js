import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';
import Featured from '@/Components/Featured';
import SweetList from '@/Components/SweetList';
import axios from 'axios';


export default function Home({sweetList}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Sweet Shop UK</title>
        <meta name="description" content="Number one sweet shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured/>
      <SweetList sweetList={sweetList} />
    </div>
  );
};

export const getServerSideProps = async() => {
  const res = await axios.get("http://localhost:3000/api/products");
  return{
    props: {
      sweetList: res.data,
    }
  }
};
