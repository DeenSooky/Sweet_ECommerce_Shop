// components/BlogPost.js
import React from 'react';
import Link from 'next/link';

const BlogPost = ({ blogPost }) => {
  return (
    <div className={styles.container}>
    <Link href = {`/product/${blogPost._id}`} passHref>
    <h1 className={styles.title}>{blogPost.title}</h1>
    <span className={styles.price}>£{blogPost.author}</span>
    <p className={styles.desc}> {blogPost.createdAt} </p>

    </Link>
  </div>
  );
};

export default BlogPost;