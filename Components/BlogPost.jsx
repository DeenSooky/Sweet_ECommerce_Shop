// Importing necessary dependencies
import React from 'react';
import Link from 'next/link';

// Functional component 'BlogPost' to display individual blog post details
const BlogPost = ({ blogPost }) => {
  return (
    // Container for the 'BlogPost' component
    <div className={styles.container}>
      
      {/* Link to the detailed view of the blog post */}
      <Link href={`/product/${blogPost._id}`} passHref>
        {/* Title of the blog post */}
        <h1 className={styles.title}>{blogPost.title}</h1>
        {/* Author of the blog post */}
        <span className={styles.author}>{blogPost.author}</span>
        {/* Description or timestamp of when the blog post was created */}
        <p className={styles.desc} > {blogPost.createdAt} </p>
      </Link>
    </div>
  );
};

// Exporting the 'BlogPost' component
export default BlogPost;
