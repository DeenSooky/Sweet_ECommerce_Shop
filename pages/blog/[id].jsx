// BlogPostPage.js
import React, { useState, useEffect } from 'react';
import styles from '../../styles/blog.module.css';
import Image from 'next/image';

const BlogPostPage = ({ blogPosts, index, onCancel }) => {

  console.log("index at blog/[id]: ", index)
  const [currentIndex, setIndex] = useState(index);

  console.log("blogPosts at blog/[id]: ", blogPosts)

  const blogToShow = blogPosts[currentIndex];

  console.log("blogToShow: ", blogToShow)

  useEffect(() => {
    setIndex(index);
  }, [index]);

  const handleArrow = (direction) => {
    if (direction === 'l') {
      const newIndex = currentIndex !== 0 ? currentIndex - 1 : blogPosts.length - 1;
      setIndex(newIndex);
    }
    if (direction === 'r') {
      const newIndex = currentIndex !== blogPosts.length - 1 ? currentIndex + 1 : 0;
      setIndex(newIndex);
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.arrowContainer} style={{ right: 0 }} onClick={() => handleArrow('r')}>
        <Image src="/img/right-arrow.png" alt="right arrow" layout="fill" objectFit="contain" />
      </div>
  
      <div className={styles.wrapper}>
        <span onClick={onCancel} className={styles.close}> X </span>
        <div className={styles.imgContainerPhone}>
          <h1 className={styles.title}>{blogToShow.title}</h1>
          <p>{blogToShow.content}</p>
          <p className={styles.author}>Author: {blogToShow.author}</p>
        </div>
      </div>

      <div className={styles.arrowContainer} style={{ left: 0 }} onClick={() => handleArrow('l')}>
        <Image src="/img/left-arrow.png" layout="fill" alt="left arrow" objectFit="contain" />
      </div>

    </div>
  );
};

export default BlogPostPage;
