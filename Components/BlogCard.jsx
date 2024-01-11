import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from "next/image";
import styles from "../styles/BlogCard.module.css"

const timeFormat = (createdAt) => {
    const datetimeObject = new Date(createdAt);
    const formattedOutput = datetimeObject.toISOString().split('T')[0] + ' at ' + datetimeObject.toTimeString().split(' ')[0];
    return formattedOutput;
}
  
  
const imageDisplay = (sweetList) => {
  const inputString = "Chocolate Heaven";
  console.log("sweetList:", sweetList)

  // Use Array.map to iterate over sweetList
  return sweetList.map((sweet) => {

      console.log("sweet", sweet)

      // Check if inputString matches sweet.img
      if (inputString === sweet.title) {
      return sweet.img;
      } 
  });
};

const BlogCard = ({post, sweetList}) => {

  console.log("posts:", post)
    return(
        <div className={styles.container}>
          <Link href={`/blog/${post._id}`} passHref>
            <Image  className={styles.img} src={imageDisplay(sweetList)[0] || '/public/img/basket.png'} alt = "Blog Image" width={200} height={150}/>
            <h1 className={styles.title}>Title: {post.title}</h1> 
            <b className={styles.author}>Author: {post.author}</b>
            <p className={styles.post}>Posted: {timeFormat(post.createdAt)} </p>
            <p className={styles.content}>Content: {post.content}</p>
          </Link>
        </div>
    );
};

export const getServerSideProps = async () => {
    try {
      const res2 = await axios.get("http://localhost:3000/api/products");
  
      return {
        props: {
          sweetList: res2.data,
        },
      };
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return {
        props: {
          sweetList: [],
        },
      };
    }
    
};

export default BlogCard
