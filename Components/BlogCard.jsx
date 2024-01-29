// Importing necessary dependencies and styles
import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from "next/image";
import styles from "../styles/BlogCard.module.css"

// Function to format the creation time of a blog post
const timeFormat = (createdAt) => {
  const datetimeObject = new Date(createdAt);
  const formattedOutput = datetimeObject.toISOString().split('T')[0] + ' at ' + datetimeObject.toTimeString().split(' ')[0];
  return formattedOutput;
}

// Component 'BlogCard' to display individual blog post details
const BlogCard = ({post, sweetList}) => {
    
    return (
      // Container for the blog card, with a link to the detailed blog page
      <div className={styles.container}>
          <Link href={`/blog/${post._id}`} passHref>
              {/* Image component with the blog post's featured image or a default image */}
              <Image  className={styles.img} src={imageDisplay(sweetList)[0] || '/public/img/basket.png'} alt="Blog Image" width={200} height={150}/>
              {/* Title of the blog post */}
              <h1 className={styles.title}>Title: {post.title}</h1> 
              {/* Author of the blog post */}
              <b className={styles.author}>Author: {post.author}</b>
              {/* Timestamp of when the blog post was created */}
              <p className={styles.post}>Posted: {timeFormat(post.createdAt)} </p>
              {/* Content of the blog post */}
              <p className={styles.content}>Content: {post.content}</p>
          </Link>
      </div>
    );
};

// Server-side function to fetch data for the component
export const getServerSideProps = async () => {
  try {
      // Fetching the list of sweet products from an API endpoint
      const res2 = await axios.get("http://localhost:3000/api/products");

      // Returning the fetched data as props
      return {
          props: {
              sweetList: res2.data,
          },
      };
  } catch (error) {
      // Handling errors during data fetching
      console.error("Error fetching blog posts:", error);

      // Returning an empty array as props in case of an error
      return {
          props: {
              sweetList: [],
          },
      };
  }
};

// Exporting the 'BlogCard' component
export default BlogCard;
